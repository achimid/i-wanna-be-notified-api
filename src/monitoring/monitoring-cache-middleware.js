const crypto = require('crypto')
const { OK } = require('http-status-codes')
const commons = require('../utils/commons')

const TIMEOUT_CLEAN_CACHE = process.env.TIMEOUT_CLEAN_CACHE || (1000 * 60 * 2)

const pollResponse = {}
const pollCache = {}

const getHashFromRequest = (body, ip) => crypto.createHash('md5').update(JSON.stringify(body) + ip).digest('hex')

setInterval(() => {    
    const pollCacheSize = commons.sizeOf(pollCache)
    const pollResponseSize = commons.sizeOf(pollResponse)

    const pollCacheLength = Object.keys(pollCache).length
    const pollResponseLength  = Object.keys(pollResponse).length

    console.info(`Objects Cached => pollCache: [${pollCacheSize}] [${pollCacheLength}]`)
    console.info(`Objects Cached => pollResponse: [${pollResponseSize}] [${pollResponseLength}]`)
}, 60000)


const createTimeoutCleaner = (hash) => setTimeout(() => { 
    console.log(`[${hash}] This cache is not used. Cleaning...`)
    const cache = pollCache[hash]

    clearTimeout(cache.timeout)
    delete cache.req
    delete cache.timeout
    delete pollCache[hash]    
    delete pollResponse[cache.id]

}, TIMEOUT_CLEAN_CACHE)


const cacheRequest = (isFull) => (req, res, next) => {
    req.hash = getHashFromRequest(req.body, req.ip)    

    const result =  (pollCache[req.hash] || {}).result
    if (result) {
        console.log('Request [CACHED]')
        processCallbackResponseCached(req, res)(result, isFull)
    } else {
        console.log('Request [NOT CACHED]')
        next()
    }    
}


const processRequestCreation = (req, res) => ({ id }) => {    
    const { body, ip } = req
    const hash = req.hash
    const timeout = createTimeoutCleaner(hash)

    pollResponse[id] = {
        res,
        hash
    }
    pollCache[req.hash] = {
        id,
        ip,
        body,              
        req,
        timeout
    }
}


const processCallbackResponseCached = (req, res) => (body, isFull) => {
    const { execution } = body
    const id = execution.monitoringId

    if (pollResponse[id] && execution.isLast) {
        console.log(`[${req.hash}] This cache is used. Cleaning...`)

        const data = getFormattedResponse(body, isFull)

        res.status(OK).send(data)

        
        // Ao descomentar esse linha o cache se tornará valido apenas uma vez
        // Com essas linhas comentadas o  cache só será apagado quando expirar o tempo TIMEOUT_CLEAN_CACHE.
        
        // const cache = pollCache[req.hash]

        // clearTimeout(cache.timeout)
        // delete cache.req
        // delete cache.timeout
        // delete pollCache[req.hash]
        // delete pollResponse[id]
    }

    pollResponse[id] = {
        res,
        hash: res.hash
    }
}


const processCallbackResponse = (body, isFull) => {
    const id = body.execution.monitoringId

    if (pollResponse[id] && body.execution.isLast) {
        const data = getFormattedResponse(body, isFull)
        const cache = pollResponse[id]

        pollCache[cache.hash].result = body
        console.log(`[${cache.hash}] Caching response to be re-used...`)

        cache.res.send(data)
    }
}




const getFormattedResponse = (body, isFull) => {
    let data = body 
        
    if (!isFull) {
        const { execution } = body
        data = { 
            extractedTarget: execution.extractedTarget,
            url: execution.url,
            isSuccess: execution.isSuccess,
            uuid: execution.uuid,
            executionTime: execution.executionTime,
            extractedContent: execution.extractedContent,

            errorOnExecuteScriptTarget: execution.errorOnExecuteScriptTarget,
            errorOnPrintPage: execution.errorOnPrintPage,
            errorOnUploadPrintscreen: execution.errorOnUploadPrintscreen,
            errorOnRemovePrintscreen: execution.errorOnRemovePrintscreen,
            errorOnExecuteScriptTarget: execution.errorOnExecuteScriptTarget,
            errorOnExecuteScriptTarget: execution.errorOnExecuteScriptTarget,
            errorOnAddUserAgent: execution.errorOnAddUserAgent
        }
    }

    return data
}


module.exports = {
    cacheRequest,
    getHashFromRequest,
    createTimeoutCleaner,
    processRequestCreation,
    processCallbackResponse,
    processCallbackResponseCached
}
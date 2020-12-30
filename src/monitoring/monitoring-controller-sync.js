const router = require('express').Router()

const crypto = require('crypto')
const { OK } = require('http-status-codes')
const service = require('./monitoring-service')
const commons = require('../utils/commons')

const { API_URL, API_VERSION, API_PREFIX } =  process.env
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


const filterCachedRequest = (isFull) => (req, res, next) => {
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

const setCustomParams = async (body, full) => {
    
    if (!body.notifications) body.notifications = []
    body.notifications.push({
        webhook: {
            method: "PATCH",
            url: `${API_URL}${API_PREFIX}${API_VERSION}/monitoring/sync${full ? '/full' : ''}`
        }
    })

    if (!body.options) body.options = {}    
    body.options.temporary = true

    if (!body.regularity) body.regularity = process.env.CRON_TIME_DEFAULT

    return body
}




router.post('/', filterCachedRequest(false), async (req, res) => {
    setCustomParams(req.body, false)
        .then(service.createTemporary)
        .then(processRequestCreation(req, res))
})

router.patch('/', async (req, res) => {
    processCallbackResponse(req.body, false)
    res.status(OK).send()
})




router.post('/full', filterCachedRequest(true), async (req, res) => {
    setCustomParams(req.body, true)
        .then(service.createTemporary)
        .then(processRequestCreation(req, res))
})

router.patch('/full', async (req, res) => {
    processCallbackResponse(req.body, true)
    res.status(OK).send()
})



module.exports = router
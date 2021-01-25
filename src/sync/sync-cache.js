const { toMD5 } = require('../utils/security')
const commons = require('../utils/commons')

const TIMEOUT_CLEAN_CACHE = process.env.TIMEOUT_CLEAN_CACHE || (1000 * 60 * 5)

const poolIds = {}
const poolCache = {}
const timeoutPool = {}

const toHash = (value) => toMD5(JSON.stringify(value))

setInterval(() => {    
    const poolCacheSize = commons.sizeOf(poolCache)
    const poolCacheLength = Object.keys(poolCache).length

    const poolIdsSize = commons.sizeOf(poolIds)
    const poolIdsLength = Object.keys(poolIds).length

    const timeoutPoolSize = commons.sizeOf(timeoutPool)
    const timeoutPoolLength = Object.keys(timeoutPool).length

    console.info(`Objects Cached => poolCache: [${poolCacheSize}] [${poolCacheLength}]`)
    console.info(`Objects Cached => poolIds: [${poolIdsSize}] [${poolIdsLength}]`)
    console.info(`Objects Cached => timeoutPool: [${timeoutPoolSize}] [${timeoutPoolLength}]`)
}, 60000)


const clearInfo = (key) => { 

    if (poolIds[key]) {
        delete poolIds[key]
    }

    if (poolCache[key]) {
        delete poolCache[key].result
        delete poolCache[key].res
        delete poolCache[key]
    }

    if (timeoutPool[key]) {
        clearTimeout(timeoutPool[key])
        delete timeoutPool[key]
    }

}

const setMonitoring = (req, _id) => {
    const hash = toHash({ ...req.body, ip: req.ip, path: req.originalUrl })
    poolIds[_id] = hash
    timeoutPool[_id] = setTimeout(() => clearInfo(_id), TIMEOUT_CLEAN_CACHE)
}

const setResult = (_id, result) => {
    if (poolIds[_id]) {
        if (poolCache[poolIds[_id]]) {
            poolCache[poolIds[_id]].result = result
        }
    }
}

const processRequest = (req, res, next) => {
    const hash = toHash({ ...req.body, ip: req.ip, path: req.originalUrl })

    if (poolCache[hash]) {
        if (poolCache[hash].result) {
            res.send(poolCache[hash].result)
        } else {
            delete poolCache[hash].res
            poolCache[hash].res = res
            next()
        }
    } else {
        poolCache[hash] = { res }
        timeoutPool[hash] = setTimeout(() => clearInfo(hash), TIMEOUT_CLEAN_CACHE)
        next()
    }
}



module.exports = {
    setResult,
    setMonitoring,
    processRequest
}
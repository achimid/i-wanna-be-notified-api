const router = require('express').Router()
const { OK } = require('http-status-codes')

const service = require('./monitoring-service')
const validator = require('./monitoring-validator')
const cache = require('./monitoring-cache-middleware')

const { API_URL, API_VERSION, API_PREFIX } =  process.env


router.post('/', validator.post, cache.cacheRequest(false), (req, res) => {
    return setCustomParams(req.body, false)
        .then(service.createTemporary)
        .then(cache.processRequestCreation(req, res))
        .catch(res.onError)
})

router.patch('/', async (req, res) => {
    cache.processCallbackResponse(req.body, false)
    res.status(OK).send()
})




router.post('/full', validator.post, cache.cacheRequest(true), (req, res) => {
    return setCustomParams(req.body, true)
        .then(service.createTemporary)
        .then(cache.processRequestCreation(req, res))
        .catch(res.onError)
})

router.patch('/full', async (req, res) => {
    cache.processCallbackResponse(req.body, true)
    res.status(OK).send()
})



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
    body.options.disabled = true

    if (!body.regularity) body.regularity = process.env.CRON_TIME_DEFAULT

    return body
}




module.exports = router
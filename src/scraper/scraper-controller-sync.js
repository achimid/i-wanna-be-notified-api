const router = require('express').Router()
const service = require('./scraper-service')
const sync = require('../sync/sync-middleware')

const { API_URL, API_VERSION, API_PREFIX } =  process.env

const addWebHook = async (body) => {
    
    if (!body.notifications) body.notifications = []
    body.notifications.push({
        webhook: {
            method: "PATCH",
            url: `${API_URL}${API_PREFIX}${API_VERSION}/sync`
        }
    })

    return body
}

router.post('/', (req, res) => {
    console.log('Creating a scraping - Sync')
    return addWebHook(req.body)
        .then(service.create)
        .then(sync.processRequest(res, req.query.fullBody))
        .catch(res.onError)
})

router.post('/pdf', (req, res) => {
    console.log('Creating a scraping - PDF - Sync')
    return addWebHook(req.body)
        .then(service.pdf)
        .then(sync.processRequest(res, req.query.fullBody))
        .catch(res.onError)
})

router.post('/link', (req, res) => {
    console.log('Creating a scraping - Link - Sync')
    return addWebHook(req.body)
        .then(service.link)
        .then(sync.processRequest(res, req.query.fullBody))
        .catch(res.onError)
})

router.post('/image', (req, res) => {
    console.log('Creating a scraping - Image - Sync')
    return addWebHook(req.body)
        .then(service.image)
        .then(sync.processRequest(res, req.query.fullBody))
        .catch(res.onError)
})

router.post('/screenshot', (req, res) => {
    console.log('Creating a scraping - Screenshot - Sync')    
    return addWebHook(req.body)
        .then(service.screenshot)
        .then(sync.processRequest(res, req.query.fullBody))
        .catch(res.onError)
})

router.post('/screenshot/full', (req, res) => {
    console.log('Creating a scraping - Screenshot Full - Sync')
    return addWebHook(req.body)
        .then(service.screenshotFull)
        .then(sync.processRequest(res, req.query.fullBody))
        .catch(res.onError)
})


module.exports = router
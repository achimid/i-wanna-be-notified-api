const router = require('express').Router()
const service = require('./scraper-service')

const sync = require('../sync/sync-middleware')
const cache = require('../sync/sync-cache')

router.post('/', cache.processRequest, (req, res) => {
    console.log('Creating a scraping - Sync')
    return sync.addWebHook({ ...req.body })
        .then(service.create)
        .then(sync.processRequest(req, res))
        .catch(res.onError)
})

router.post('/pdf', cache.processRequest, (req, res) => {
    console.log('Creating a scraping - PDF - Sync')
    return sync.addWebHook({ ...req.body })
        .then(service.pdf)
        .then(sync.processRequest(req, res))
        .catch(res.onError)
})

router.post('/link', cache.processRequest, (req, res) => {
    console.log('Creating a scraping - Link - Sync')
    return sync.addWebHook({ ...req.body })
        .then(service.link)
        .then(sync.processRequest(req, res))
        .catch(res.onError)
})

router.post('/image', cache.processRequest, (req, res) => {
    console.log('Creating a scraping - Image - Sync')
    return sync.addWebHook({ ...req.body })
        .then(service.image)
        .then(sync.processRequest(req, res))
        .catch(res.onError)
})

router.post('/screenshot', cache.processRequest, (req, res) => {
    console.log('Creating a scraping - Screenshot - Sync')    
    return sync.addWebHook({ ...req.body })
        .then(service.screenshot)
        .then(sync.processRequest(req, res))
        .catch(res.onError)
})

router.post('/screenshot/full', cache.processRequest, (req, res) => {
    console.log('Creating a scraping - Screenshot Full - Sync')
    return sync.addWebHook({ ...req.body })
        .then(service.screenshotFull)
        .then(sync.processRequest(req, res))
        .catch(res.onError)
})


module.exports = router
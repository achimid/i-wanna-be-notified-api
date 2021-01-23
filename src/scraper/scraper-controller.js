const router = require('express').Router()
const { CREATED } = require('http-status-codes')
const service = require('./scraper-service')

router.post('/', (req, res) => {
    console.log('Creating a scraping')
    return service.create(req.body)
        .then(data => res.status(CREATED).send(data))
        .catch(res.onError)
})

router.post('/pdf', (req, res) => {
    console.log('Creating a scraping - PDF')
    return service.pdf(req.body)
        .then(data => res.status(CREATED).send(data))
        .catch(res.onError)
})

router.post('/link', (req, res) => {
    console.log('Creating a scraping - Link')
    return service.link(req.body)
        .then(data => res.status(CREATED).send(data))
        .catch(res.onError)
})

router.post('/image', (req, res) => {
    console.log('Creating a scraping - Image')
    return service.image(req.body)
        .then(data => res.status(CREATED).send(data))
        .catch(res.onError)
})

router.post('/screenshot', (req, res) => {
    console.log('Creating a scraping - Screenshot')
    return service.screenshot(req.body)
        .then(data => res.status(CREATED).send(data))
        .catch(res.onError)
})

router.post('/screenshot/full', (req, res) => {
    console.log('Creating a scraping - Screenshot Full')
    return service.screenshotFull(req.body)
        .then(data => res.status(CREATED).send(data))
        .catch(res.onError)
})


module.exports = router
const router = require('express').Router()
const { CREATED } = require('http-status-codes')
const service = require('./crawler-service')

router.post('/', (req, res) => {
    console.log('Creating a crawler')
    return service.create(req.body)
        .then(data => res.status(CREATED).send(data))
        .catch(res.onError)
})


module.exports = router
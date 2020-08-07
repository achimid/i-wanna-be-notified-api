const router = require('express').Router()
const { OK } = require('http-status-codes')
const service = require('./notification-service')


router.get('/', (req, res) => {
    console.log('Find notification by filter')
    return service.findByFilter(req.query)
        .then(logs => res.status(OK).send(logs))
})

router.get('/:id', (req, res) => {
    console.log('Find notification by id')
    return service.findById(req.params.id)
        .then(log => res.status(OK).send(log))
})


module.exports = router
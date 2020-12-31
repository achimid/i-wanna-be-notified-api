const router = require('express').Router()
const { OK } = require('http-status-codes')

const service = require('./notification-service')
const { validatePathId } = require('../utils/validator')


router.get('/', (req, res) => {
    console.log('Find notifications by filter')
    return service.findByFilter(req.query)
        .then(notifications => res.status(OK).send({ notifications }))
        .catch(res.onError)
})

router.get('/:id', validatePathId, (req, res) => {
    console.log('Find notification by id')
    return service.findById(req.params.id)
        .then(notification => res.status(OK).send(notification))
        .catch(res.onError)
})


module.exports = router
const router = require('express').Router()
const { OK } = require('http-status-codes')

const service = require('./execution-service')
const { validatePathId } = require('../utils/validator')

router.get('/', (req, res) => {
    console.log('Find executions by filter')
    return service
        .findByFilter(req.query)
        .then(executions => res.status(OK).send({ executions }))
        .catch(res.onError)
})

router.get('/:id', validatePathId, (req, res) => {
    console.log('Find execution by id')
    return service
        .findById(req.params.id)
        .then(execution => res.status(OK).send(execution))
        .catch(res.onError)
})

module.exports = router
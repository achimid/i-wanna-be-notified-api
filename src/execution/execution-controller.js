const router = require('express').Router()
const { OK, CREATED } = require('http-status-codes')

const service = require('./execution-service')

router.get('/', (req, res) => {
    console.log('Find execution by filter')
    return service
        .findByFilter(req.query)
        .then(executions => res.status(OK).send(executions))
})

router.get('/:id', (req, res) => {
    console.log('Find execution by filter')
    return service
        .findById(req.params.id)
        .then(execution => res.status(OK).send(execution))
})

router.post('/test', (req, res) => {
    console.log('Create a new execution on queue process')
    return service
        .postExecution(req.body)
        .then(execution => res.status(CREATED).send(execution))
})

module.exports = router
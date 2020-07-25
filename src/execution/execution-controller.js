const router = require('express').Router()
const { OK, CREATED } = require('http-status-codes')

const executionModel = require('./execution-model')
const { clearObj } = require('../utils/commons')

router.get('/', (req, res) => { 
    const { uuid, url, isSuccess, level, hashTarget } =  req.query
    const filter = clearObj({ uuid, url, isSuccess, level, hashTarget })
    return executionModel
        .find(filter).lean()
        .then(executions => res.status(OK).send(executions))
})

router.get('/:id', (req, res) => {
    return executionModel
        .findById(req.params.id).lean()
        .then(execution => res.status(OK).send(execution))
})

router.post('/test', (req, res) => {
    res.status(CREATED).send('Create a new execution on queue process')
})

module.exports = router
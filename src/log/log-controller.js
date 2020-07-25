const router = require('express').Router()
const { OK } = require('http-status-codes')

const logModel = require('./log-model')
const { clearObj } = require('../utils/commons')

router.get('/', (req, res) => {
    const { startDate, endDate, uuid, type } =  req.query
    const filter = clearObj({ uuid })
    
    if (startDate && endDate) filter.createdAt = {'$gte': startDate, '$lt': endDate}

    return logModel
        .find(filter).lean()
        .then(async (logs) => {
            if (type == 'text') return logs.map(formatLog)
            return logs
        })
        .then(logs => res.status(OK).send(logs))
})

const formatLog = (l) => `${l.uuid}, [${l.level || 0}], ${l.executionTime || '0ms'}, ${l.log}, ${l.extra ? JSON.stringify(l.extra) : ''}`

router.get('/:id', (req, res) => {    
    return logModel
        .findById(req.params.id).lean()
        .then(log => res.status(OK).send(log))
})

module.exports = router
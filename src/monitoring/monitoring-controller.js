const router = require('express').Router()
const { OK, CREATED,  } = require('http-status-codes')
const service = require('./monitoring-service')

router.get('/', (req, res) => {
    console.log('Find monitoring by filter')
    return service.findByFilter(req.query)
        .then(monitorings => res.status(OK).send(monitorings))
})

router.get('/:id', (req, res) => {
    console.log('Find monitoring by id')
    return service.findById(req.params.id)
        .then(monitoring => res.status(OK).send(monitoring))
})

router.post('/', (req, res) => {
    console.log('Create new monitoring')
    return service.create(req.body)
        .then((monitoring => res.status(CREATED).send(monitoring)))
})

router.put('/:id', (req, res) => {
    console.log('Update monitoring')
    return service.update(req.params.id, req.body)
        .then(() => res.status(OK).end())
})

router.delete('/:id', (req, res) => {
    console.log('Delete monitoring by id')
    return service.remove(req.params.id)
        .then(() => res.status(OK).end())
})

module.exports = router
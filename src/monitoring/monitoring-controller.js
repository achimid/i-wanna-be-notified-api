const router = require('express').Router()
const { OK, CREATED,  } = require('http-status-codes')
const service = require('./monitoring-service')

const validator = require('./monitoring-validator')

router.get('/', (req, res) => {
    console.log('Find monitoring by filter')
    return service.findByFilter(req.query)
        .then(monitorings => res.status(OK).send(monitorings))
        .catch(res.onError)
})

router.get('/:id', validator.id, (req, res) => {
    console.log('Find monitoring by id')
    return service.findById(req.params.id)
        .then(monitoring => res.status(OK).send(monitoring))
        .catch(res.onError)
})

router.post('/', validator.post, (req, res) => {
    console.log('Create new monitoring')
    return service.create(req.body)
        .then((monitoring => res.status(CREATED).send(monitoring)))
        .catch(res.onError)
})

router.put('/:id', validator.id, validator.post, (req, res) => {
    console.log('Update monitoring')
    service.update(req.params.id, req.body)
        .then(() => res.status(OK).send())
        .catch(() => res.send())
})

router.delete('/:id', validator.id, (req, res) => {
    console.log('Delete monitoring by id')
    return service.remove(req.params.id)
        .then(() => res.status(OK).send())
        .catch(res.onError)
})

module.exports = router
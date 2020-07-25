const router = require('express').Router()
const { OK, CREATED,  } = require('http-status-codes')

router.get('/', (req, res) => { 
    res.status(OK).send(['List all monitoring by filter (name, url, regularity)'])
})

router.get('/:id', (req, res) => {
    res.status(OK).send('Find monitoring by id')
})

router.post('/', (req, res) => {
    res.status(CREATED).send('Create new monitoring')
})

router.put('/:id', (req, res) => {
    res.status(OK).send('Update monitoring by id')
})

router.delete('/:id', (req, res) => {
    res.status(OK).send('Delete monitoring by id')
})

module.exports = router
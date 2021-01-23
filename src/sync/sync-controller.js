const router = require('express').Router()
const { OK } = require('http-status-codes')
const { processResponse } = require('./sync-middleware')

router.patch('/', (req, res) => {    
    res.status(OK).send()
    processResponse(req.body)
})

module.exports = router
const router = require('express').Router()
const service = require('./crawler-service')

const sync = require('../sync/sync-middleware')
const cache = require('../sync/sync-cache')

router.post('/', cache.processRequest, (req, res) => {
    console.log('Creating a crawler - Sync')
    return sync.addWebHook({ ...req.body })
        .then(service.create)
        .then(sync.processRequest(req, res))
        .catch(res.onError)
})


module.exports = router
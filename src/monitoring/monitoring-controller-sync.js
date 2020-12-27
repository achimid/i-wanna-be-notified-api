const router = require('express').Router()
const { OK } = require('http-status-codes')
const service = require('./monitoring-service')

const { API_URL, API_VERSION, API_PREFIX } =  process.env

const pollRequests = {}

router.post('/', async (req, res) => {
    setCustomParams(req.body, false)
        .then(service.createTemporary)
        .then(({ id }) => pollRequests[id] = res)
})

router.patch('/', async (req, res) => {
    processPoll(req.body, false)
    res.status(OK).send()
})


router.post('/full', async (req, res) => {
    setCustomParams(req.body, true)
        .then(service.createTemporary)
        .then(({ id }) => pollRequests[id] = res)
})

router.patch('/full', async (req, res) => {
    processPoll(req.body, true)
    res.status(OK).send()
})

const processPoll = (body, full) => {

    const { execution } = body
    const id = execution.monitoringId

    if (pollRequests[id]) {
        let data = body 
        
        if (!full) data = { 
            extractedTarget: execution.extractedTarget,
            url: execution.url,
            isSuccess: execution.isSuccess,
            uuid: execution.uuid,
            executionTime: execution.executionTime,

            errorOnExecuteScriptTarget: execution.errorOnExecuteScriptTarget,
            errorOnPrintPage: execution.errorOnPrintPage,
            errorOnUploadPrintscreen: execution.errorOnUploadPrintscreen,
            errorOnRemovePrintscreen: execution.errorOnRemovePrintscreen,
            errorOnExecuteScriptTarget: execution.errorOnExecuteScriptTarget,
            errorOnExecuteScriptTarget: execution.errorOnExecuteScriptTarget,
            errorOnAddUserAgent: execution.errorOnAddUserAgent
        }

        pollRequests[id].send(data)
        delete pollRequests[id]
    }
}

const setCustomParams = async (body, full) => {
    
    if (!body.notifications) body.notifications = []
    body.notifications.push({
        webhook: {
            method: "PATCH",
            url: `${API_URL}${API_PREFIX}${API_VERSION}/monitoring/sync${full ? '/full' : ''}`
        }
    })

    if (!body.options) body.options = {}    
    body.options.temporary = true

    if (!body.regularity) body.regularity = process.env.CRON_TIME_DEFAULT

    return body
}


module.exports = router
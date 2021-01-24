const cache = require('./sync-cache')

const pool = {}
const timeoutPool = {}

const TIMEOUT_CLEAN_CACHE = process.env.TIMEOUT_CLEAN_CACHE || (1000 * 60 * 5)
const { API_URL, API_VERSION, API_PREFIX } =  process.env

const addWebHook = async (body) => {
    
    if (!body.notifications) body.notifications = []
    body.notifications.push({
        webhook: {
            method: "PATCH",
            url: `${API_URL}${API_PREFIX}${API_VERSION}/sync`
        }
    })

    return body
}

const processResponse = (body) => {
    
    const { monitoringId, isLast } = body.execution

    
    if (!pool[monitoringId] || !isLast) return
    
    const bodyParsed = pool[monitoringId].fullBody ? body : formatResponseBody(body)

    pool[monitoringId].res.send(bodyParsed)
    cache.setResult(body.execution.monitoringId, bodyParsed)
    
    clearInfo(monitoringId)
}

const clearInfo = (monitoringId) => {
    delete pool[monitoringId].fullBody
    delete pool[monitoringId].res
    delete pool[monitoringId]    

    if (timeoutPool[monitoringId]) {
        clearTimeout(timeoutPool[monitoringId])
        delete timeoutPool[monitoringId]
    }
}

const processRequest = (req, res) => (monitoring) => {
    
    const {_id} = monitoring

    pool[_id] = {
        res,
        fullBody: req.query ? req.query.fullBody : false
    }    
    timeoutPool[_id] = setTimeout(() => clearInfo(_id), TIMEOUT_CLEAN_CACHE)
    
    cache.setMonitoring(req, monitoring._id.toString())
}

const formatResponseBody = (body) => {    
    if (body.executions && body.executions.length > 1) {
        return { executions: body.executions.map(formatResponseExecution)}
    }
    return formatResponseExecution(body.execution)
}

const formatResponseExecution = (execution) => {
    const { 
        uuid, 
        url, 
        isSuccess, 
        executionTime, 
        extractedTarget, 
        extractedContent, 
        printscreenLink,
        errorOnPrintPage,
        errorOnUploadPrintscreen,
        errorOnRemovePrintscreen,
        errorOnExecuteScriptTarget,
        errorOnExecuteScriptTargetRetry,
        errorOnExecuteScriptNavigate,
        errorOnAddUserAgent,
        errorOnAccessUrl
    } = execution

    return { 
        uuid, 
        url, 
        isSuccess, 
        executionTime, 
        extractedTarget, 
        extractedContent, 
        printscreenLink,
        errorOnPrintPage,
        errorOnUploadPrintscreen,
        errorOnRemovePrintscreen,
        errorOnExecuteScriptTarget,
        errorOnExecuteScriptTargetRetry,
        errorOnExecuteScriptNavigate,
        errorOnAddUserAgent,
        errorOnAccessUrl
    }
}


module.exports = {
    addWebHook,
    processRequest,
    processResponse
}
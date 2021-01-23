
const pool = {}
const TIMEOUT_CLEAN_CACHE = process.env.TIMEOUT_CLEAN_CACHE || (1000 * 60 * 1)

const processResponse = (body) => {
    
    const { monitoringId, isLast } = body.execution

    
    if (!pool[monitoringId] || !isLast) return
    
    const bodyParsed = pool[monitoringId].fullBody ? body : formatResponseBody(body)

    pool[monitoringId].res.send(bodyParsed)
    
    delete pool[monitoringId].fullBody
    delete pool[monitoringId].res
    delete pool[monitoringId]    
}

const processRequest = (res, fullBody) => ({ _id }) => {
    pool[_id] = {
        res,
        fullBody
    }
    setTimeout(() => { delete pool[_id] }, TIMEOUT_CLEAN_CACHE)
}

const formatResponseBody = (body) => {    
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
    processRequest,
    processResponse
}
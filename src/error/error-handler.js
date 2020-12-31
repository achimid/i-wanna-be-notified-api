const { INTERNAL_SERVER_ERROR } = require('http-status-codes')
const errorMap = require('./error-map')

const errorHandler = (req, res, next) => {
    res.onError = onError(req, res)
    next()
}

const onError = (req, res) => (error) => {
    let statusCode = INTERNAL_SERVER_ERROR
    let errorMessage = 'Unespected error'
    
    if (error.code) {
        const err = errorMap[error.code]
        if (err) {
            statusCode = err.statusCode
            errorMessage = err.message
        }
    } else if (error.statusCode) {
        statusCode = error.statusCode
        errorMessage = error.message
    }

    res.status(statusCode).send({ error: errorMessage })
    console.error('     [Error]: ' + (error.stack || JSON.stringify(error)))
}

module.exports = {
    errorHandler
}
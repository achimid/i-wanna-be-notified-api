const { CONFLICT } = require('http-status-codes')

module.exports = {
    11000: {
        statusCode: CONFLICT,
        message: 'Duplicated content'
    }
}
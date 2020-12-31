const { FORBIDDEN, BAD_REQUEST } = require('http-status-codes')

const forbiddenError = { statusCode: FORBIDDEN, message: 'Inválid credentials' }
const passwordMatchError = { statusCode: BAD_REQUEST, message: 'password and repeat_password not match' }

module.exports = {
    forbiddenError,
    passwordMatchError
}
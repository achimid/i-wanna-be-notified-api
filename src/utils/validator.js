const Joi = require('joi')
const { BAD_REQUEST } = require('http-status-codes')

const validate =  (res, next, schema, value) => {
    const { error } = schema.validate(value)
    if (!error) return next()
    
    res.status(BAD_REQUEST).json({ error: error.details.map(d => d.message) })    
    throw JSON.stringify({statusCode: BAD_REQUEST, message: error.details.map(d => d.message)})
}

const id = Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required()
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
const email = Joi.string().email().min(3).max(50).required()


const validatePathId = (req, res, next) => validate(res, next, Joi.object({ id }), req.params)

module.exports = {
    validate,
    v: {
        id,
        email,
        password
    },
    validatePathId
}
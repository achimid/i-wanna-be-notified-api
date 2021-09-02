const Joi = require('joi')
const Utils = require('../utils/validator')


const filterSchema = Joi.object().keys({
    threshold:              Joi.number(),
    words:                  Joi.array().items(Joi.string().optional())
})

const optionsSchema =       Joi.object().keys({
    timeout:                Joi.number(),
    waitUntil:              Joi.string(),
    enableUserAgentRandom:  Joi.optional(),
    useJquery:              Joi.optional(),
    scriptTagUrl:           Joi.string(),
    waitTime:               Joi.number(),
    printscreen:            Joi.optional(),
    printscreenFullPage:    Joi.optional(),
    notifyChange:           Joi.optional(),
    notifyUniqueChange:     Joi.optional(),
    levelMax:               Joi.number(),
    proxy:                  Joi.string(),
    temporary:              Joi.optional(),
    filterDomain:           Joi.optional(),
    splitable:              Joi.optional()
})

const notificationSchema = Joi.object().keys({
    level:                  Joi.number(),
    template:               Joi.string(),
    websocket:              Joi.optional(),
    email:                  Joi.array().items(Utils.v.email),
    telegram:               Joi.array().items(
        Joi.object().keys({
            bot_token:      Joi.string(),
            chat_id:        Joi.string(),
        })
    ),
    webhook:                Joi.array().items(
        Joi.object().keys({
            url:            Joi.string().uri().required(),
            method:         Joi.string().valid('GET', 'POST', 'PUT', 'PATCH', 'DELETE'),
        })
    )
})


const monitoringSchema = Joi.object({
    url:                    Joi.string().uri().required(),
    name:                   Joi.string(),
    scriptTarget:           Joi.string(),
    scriptNavigate:         Joi.string(),
    scriptContent:          Joi.array().items(Joi.string().optional()),
    regularity:             Joi.string(),
    mode:                   Joi.string().valid('scraper', 'crawler').optional(),
    disabled:               Joi.optional(),
    filter:                 filterSchema,
    options:                optionsSchema,
    notifications:          Joi.array().items(notificationSchema)
})


const validatePost = (req, res, next) => Utils.validate(res, next, monitoringSchema, req.body)

const validateId = (req, res, next) => Utils.validatePathId(req, res, next)

module.exports = {
    id: validateId,
    post: validatePost
}
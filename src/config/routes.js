const healthcheck = require('./healthcheck')
const log = require('../log/log-controller')
const execution = require('../execution/execution-controller')
const monitoring = require('../monitoring/monitoring-controller')
const notification = require('../notification/notification-controller')

const prefix = process.env.API_PREFIX + process.env.API_VERSION

module.exports = async (app) => {
    console.info('Registrando rotas...')

    app.use(`${prefix}`, healthcheck)
    app.use(`${prefix}/log`, log)
    app.use(`${prefix}/execution`, execution)
    app.use(`${prefix}/monitoring`, monitoring)
    app.use(`${prefix}/notification`, notification)

    return app
}
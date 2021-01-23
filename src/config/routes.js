const healthcheck = require('./healthcheck')
const log = require('../log/log-controller')
const sync = require('../sync/sync-controller')

const scraper = require('../scraper/scraper-controller')
const scraperSync = require('../scraper/scraper-controller-sync')

const execution = require('../execution/execution-controller')

const monitoring = require('../monitoring/monitoring-controller')
const monitoringSync = require('../monitoring/monitoring-controller-sync')

const notification = require('../notification/notification-controller')

const prefix = process.env.API_PREFIX + process.env.API_VERSION

module.exports = async (app) => {
    console.info('Registrando rotas...')

    app.use(`${prefix}`, healthcheck)
    app.use(`${prefix}/log`, log)
    app.use(`${prefix}/sync`, sync)

    app.use(`${prefix}/scraper`, scraper)
    app.use(`${prefix}/sync/scraper`, scraperSync)

    app.use(`${prefix}/execution`, execution)
    
    app.use(`${prefix}/monitoring`, monitoring)
    app.use(`${prefix}/monitoring/sync`, monitoringSync)
    
    app.use(`${prefix}/notification`, notification)

    return app
}
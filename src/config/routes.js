const healthcheck = require('./healthcheck')
const log = require('../log/log-controller')
const sync = require('../sync/sync-controller')

const scraper = require('../scraper/scraper-controller')
const scraperSync = require('../scraper/scraper-controller-sync')

const execution = require('../execution/execution-controller')
const monitoring = require('../monitoring/monitoring-controller')
const notification = require('../notification/notification-controller')

const crawler = require('../crawler/crawler-controller')
const crawlerSync = require('../crawler/crawler-controller-sync')


const prefix = process.env.API_PREFIX + process.env.API_VERSION

module.exports = async (app) => {
    console.info('Registrando rotas...')

    app.use(`${prefix}`, healthcheck)
    app.use(`${prefix}/log`, log)
    
    app.use(`${prefix}/sync`, sync)
    app.use(`${prefix}/sync/scraper`, scraperSync)
    app.use(`${prefix}/sync/crawler`, crawlerSync)

    app.use(`${prefix}/scraper`, scraper)
    app.use(`${prefix}/crawler`, crawler)
    app.use(`${prefix}/execution`, execution)    
    app.use(`${prefix}/monitoring`, monitoring)
    
    app.use(`${prefix}/notification`, notification)

    return app
}
const fetch = require('node-fetch')
const { clearObj } = require('../utils/commons')
const { postExecution } = require('../execution/execution-service')

const MonitoringModel = require('./monitoring-model')


const SCHEDULER_API_URL_BASE = process.env.SCHEDULER_API_URL


const limit = parseInt(process.env.DEFAULT_ENDPOINT_LIST_LIMIT)

const findByFilter = (filter) => {
    const { name, url, regularity } =  filter
    filter = clearObj({ name, url, regularity })

    return MonitoringModel.many(Model => Model
        .find(filter)
        .sort({createdAt: -1})
        .limit(limit)
        .lean())
}

const findById = (id) => MonitoringModel.findByIdLean(id)

const update = (id, data) => MonitoringModel.findByIdAndUpdate(id, data).then(restartTrigger)

const remove = (_id) => MonitoringModel.deleteOne({ _id }).then(restartTrigger)

const create = (data) => MonitoringModel.create(data).then(restartTrigger)

const createTemporary = (data) => {    

    if (!data.options) data.options = {}    
    data.options.temporary = true
    data.disabled = true

    if (!data.regularity) data.regularity = process.env.CRON_TIME_DEFAULT

    return MonitoringModel.create(data).then(postNewExecution)
}

const restartTrigger = async (data) => {
    restartSchedulerTrigger()
    return data
}

const postNewExecution = async (data) => {
    console.log('Adding new execution on queue')
    
    postExecution({...data.toObject(), monitoringId: data._id})
    
    return data
}

const restartSchedulerTrigger = async () => fetch(`${SCHEDULER_API_URL_BASE}/admin/restart`)
    .then(() => console.info('Restart Trigger called with success'))

module.exports = {
    findByFilter,
    findById,
    update,
    remove,
    create,
    createTemporary
}
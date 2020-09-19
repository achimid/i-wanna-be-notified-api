const { clearObj } = require('../utils/commons')
const { restartTriggerEvent } = require('./moitoring-producer')
const MonitoringModel = require('./monitoring-model')

const limit = parseInt(process.env.DEFAULT_ENDPOINT_LIST_LIMIT)

const findByFilter = (filter) => {
    const { name, url, regularity } =  filter
    filter = clearObj({ name, url, regularity })

    return MonitoringModel.many(Model => Model
        .find(filter)
        .sort({createdAt: 1})
        .limit(limit)
        .lean())
}

const findById = (id) => MonitoringModel.findByIdLean(id)

const update = (id, data) => MonitoringModel.findByIdAndUpdate(id, data).then(restartTrigger)

const remove = (_id) => MonitoringModel.deleteOne({ _id }).then(restartTrigger)

const create = (data) => MonitoringModel.create(data).then(restartTrigger)

const restartTrigger = async (data) => {
    restartTriggerEvent({})
    return data
}

module.exports = {
    findByFilter,
    findById,
    update,
    remove,
    create
}
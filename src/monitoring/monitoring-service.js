const { clearObj } = require('../utils/commons')
const { restartTriggerEvent } = require('./moitoring-producer')
const monitoringModel = require('./monitoring-model')

const limit = parseInt(process.env.DEFAULT_ENDPOINT_LIST_LIMIT)

const findByFilter = (filter) => {
    const { name, url, regularity } =  filter
    filter = clearObj({ name, url, regularity })

    return monitoringModel
        .find(filter)
        .sort({createdAt: 1})
        .limit(limit)
        .lean()
}

const findById = (id) => monitoringModel.findById(id).lean()

const update = (id, data) => monitoringModel.findByIdAndUpdate(id, data).then(restartTrigger)

const remove = (id) => monitoringModel.deleteOne({ id }).then(restartTrigger)

const create = (data) => new monitoringModel(data).save().then(restartTrigger)

const restartTrigger = async (data) => {
    restartTriggerEvent({})
    return data;
}

module.exports = {
    findByFilter,
    findById,
    update,
    remove,
    create
}
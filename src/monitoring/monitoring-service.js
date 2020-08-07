const MonitoringModel = require('./monitoring-model')
const { clearObj } = require('../utils/commons')

const findByFilter = (filter) => {
    const { name, url, regularity } =  filter
    filter = clearObj({ name, url, regularity })

    return MonitoringModel.find(filter).lean()
}

const findById = (id) => MonitoringModel.findById(id).lean()

const update = (id, data) => MonitoringModel.findByIdAndUpdate(id, data)

const remove = (id) => MonitoringModel.deleteOne({ id })

const create = (data) => new MonitoringModel(data).save()

module.exports = {
    findByFilter,
    findById,
    update,
    remove,
    create
}
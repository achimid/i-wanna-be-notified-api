const monitoringModel = require('./monitoring-model')
const { clearObj } = require('../utils/commons')

const limit = process.env.DEFAULT_ENDPOINT_LIST_LIMIT

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

const update = (id, data) => monitoringModel.findByIdAndUpdate(id, data)

const remove = (id) => monitoringModel.deleteOne({ id })

const create = (data) => new monitoringModel(data).save()

module.exports = {
    findByFilter,
    findById,
    update,
    remove,
    create
}
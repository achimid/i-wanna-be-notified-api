const { clearObj } = require('../utils/commons')
const producer = require('./execution-producer')
const executionModel = require('./execution-model')

const limit = process.env.DEFAULT_ENDPOINT_LIST_LIMIT

const findByFilter = (filter) => {
    const { uuid, url, isSuccess, level, hashTarget, monitoringId, hashTargetChanged, hashTargetUnique  } =  filter
    filter = clearObj({ uuid, url, isSuccess, level, hashTarget, monitoringId, hashTargetChanged, hashTargetUnique })

    return executionModel
        .find(filter)
        .sort({createdAt: 1})
        .limit(limit)
        .lean()
}

const findById = (id) => executionModel.findById(id).lean()

const postExecution = (data) => {
    const execution = new executionModel(data).toJSON()
    return producer.postExecution(execution).then(() => execution)
}

module.exports = {
    findByFilter,
    findById,
    postExecution
}
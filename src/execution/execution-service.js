const { clearObj } = require('../utils/commons')
const producer = require('./execution-producer')
const ExecutionModel = require('./execution-model')

const limit = parseInt(process.env.DEFAULT_ENDPOINT_LIST_LIMIT)

const findByFilter = (filter) => {
    const { uuid, url, isSuccess, level, hashTarget, monitoringId, hashTargetChanged, hashTargetUnique, isLast } =  filter
    filter = clearObj({ uuid, url, isSuccess, level, hashTarget, monitoringId, hashTargetChanged, hashTargetUnique, isLast })

    return ExecutionModel.many(Model => Model
        .find(filter)
        .sort({createdAt: -1})
        .limit(limit)
        .lean())
}

const findById = (id) => ExecutionModel.findByIdLean(id)

const postExecution = (data) => {    
    const execution = ExecutionModel.get(data).toJSON()
    return producer.postExecution(execution).then(() => execution)
}

module.exports = {
    findByFilter,
    findById,
    postExecution
}
const { clearObj } = require('../utils/commons')
const producer = require('./execution-producer')
const executionModel = require('./execution-model')

const findByFilter = (filter) => {
    const { uuid, url, isSuccess, level, hashTarget } =  filter
    filter = clearObj({ uuid, url, isSuccess, level, hashTarget })

    return executionModel.find(filter).lean()
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
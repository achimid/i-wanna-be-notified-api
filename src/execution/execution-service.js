const executionModel = require('./execution-model')
const { clearObj } = require('../utils/commons')

const findByFilter = (filter) => {
    const { uuid, url, isSuccess, level, hashTarget } =  filter
    filter = clearObj({ uuid, url, isSuccess, level, hashTarget })

    return executionModel.find(filter).lean()
}

const findById = (id) => executionModel.findById(id).lean()

module.exports = {
    findByFilter,
    findById
}
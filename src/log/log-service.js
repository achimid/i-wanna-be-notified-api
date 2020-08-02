const logModel = require('./log-model')

const findByFilter = (filter) => {
    const { startDate, endDate, uuid, type } =  filter
    filter = dateBetween({ uuid }, startDate, endDate)

    return logModel
        .find(filter)
        .sort({createdAt: 1})
        .lean()
        .then(formatType(type))
}

const formatType = (type) => type != 'text' ? (logs) => logs : (logs) => logs.map(formatLog)

const formatLog = (l) => `${l.uuid}, [${l.level || 0}], ${l.executionTime || '0ms'}, ${l.log}, ${l.extra ? JSON.stringify(l.extra) : ''}`

const dateBetween = (filter, startDate, endDate) => {
    if (startDate && endDate) filter.createdAt = {'$gte': startDate, '$lt': endDate}
    return filter
}

const findById = (id) => logModel.findById(id).lean()

module.exports = {
    findByFilter,
    findById
}
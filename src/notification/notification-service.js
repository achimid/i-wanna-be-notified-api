const NotificationModel = require('./notification-model')
const { clearObj, dateBetween } = require('../utils/commons')

const limit = parseInt(process.env.DEFAULT_ENDPOINT_LIST_LIMIT)

const findByFilter = (filter) => {
    const { uuid, executionId, monitoringId, type, isSuccess, startDate, endDate} =  filter
    filter = dateBetween({ uuid, executionId, monitoringId, type, isSuccess }, startDate, endDate)

    return NotificationModel.many(Model => Model
        .find(clearObj(filter))
        .sort({createdAt: -1})
        .limit(limit)
        .lean())
}

const findById = (id) => NotificationModel.findByIdLean(id)

module.exports = {
    findByFilter,
    findById
}
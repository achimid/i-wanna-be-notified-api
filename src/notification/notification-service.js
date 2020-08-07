const notificationModel = require('./notification-model')
const { clearObj, dateBetween } = require('../utils/commons')

const limit = process.env.DEFAULT_ENDPOINT_LIST_LIMIT

const findByFilter = (filter) => {
    const { uuid, executionId, monitoringId, type, isSuccess, startDate, endDate} =  filter
    filter = dateBetween({ uuid, executionId, monitoringId, type, isSuccess }, startDate, endDate)

    return notificationModel
        .find(clearObj(filter))
        .sort({createdAt: 1})
        .limit(limit)
        .lean()
}

const findById = (id) => notificationModel.findById(id).lean()

module.exports = {
    findByFilter,
    findById
}
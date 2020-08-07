const clearObj = (obj) => {
    Object.keys(obj).forEach(key => {
        if (obj[key] === undefined) delete obj[key]
    })
    return obj
}

const dateBetween = (filter, startDate, endDate) => {
    if (startDate && endDate) filter.createdAt = {'$gte': startDate, '$lt': endDate}
    return filter
}


module.exports = {
    clearObj,
    dateBetween
}
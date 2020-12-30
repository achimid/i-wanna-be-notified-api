const sizeof = require('object-sizeof')

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

const formatByteSize = (bytes) => {
    if(bytes < 1024) return bytes + " bytes"
    else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB"
    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB"
    else return(bytes / 1073741824).toFixed(3) + " GiB"
}

const sizeOf = (obj) => {
    return formatByteSize(sizeof(obj))
}

module.exports = {
    clearObj,
    dateBetween,
    sizeOf
}
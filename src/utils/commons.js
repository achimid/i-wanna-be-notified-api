const clearObj = (obj) => {
    Object.keys(obj).forEach(key => {
        if (obj[key] === undefined) delete obj[key]
    })
    return obj
}

module.exports = {
    clearObj
}
const { createTemporary } = require('../monitoring/monitoring-service')

const create = (data) => {
    
    data.mode = 'crawler'
    
    if (!data.options) data.options = {}
    data.options.levelMax = 5
    
    return createTemporary(data)
}


module.exports = {
    create
}
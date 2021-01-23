const { createTemporary } = require('../monitoring/monitoring-service')

const create = (data) => {
    
    if (data) delete data.mode
    if (data.options) delete data.options.levelMax
    
    return createTemporary(data)
}

const pdf = (data) => {

    if (!data.options) data.options = {}
    data.options.pdf = true

    return create(data)
}

const link = (data) => {
    
    if (!data.scriptTarget) data.scriptTarget = "[...document.querySelectorAll('a')].map(e => e.href)"
    
    return create(data)
}

const image = (data) => {

    if (!data.scriptTarget) data.scriptTarget = "[...document.querySelectorAll('img')].map(e => e.src)"

    return create(data)
}

const screenshot = (data) => {

    if (!data.options) data.options = {}
    data.options.printscreen = true

    return create(data)
}

const screenshotFull = (data) => {

    if (!data.options) data.options = {}
    data.options.printscreenFullPage = true

    return create(data)
}

module.exports = {
    create,
    pdf,
    link,
    image,
    screenshot,
    screenshotFull
}
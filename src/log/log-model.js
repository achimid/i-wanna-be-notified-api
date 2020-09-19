const mongoose = require('mongoose')
const { createConnectionLog } = require('../config/database')

const schema = mongoose.Schema({    
    uuid: { type: String }, 
    executionTime: { type: String }, 
    level: { type: String },
    log: { type: String }, 
    extra: { type: Object },
    createdAt: { type: Date, required: true, default: new Date() }
}, { versionKey: false, timestamps: false })

const Log = createConnectionLog().model('logs', schema)
module.exports = Log
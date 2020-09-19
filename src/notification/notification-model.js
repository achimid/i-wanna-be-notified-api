const config = require('../config/database-config')
const mongoose = require('../config/mongoose-multi-db')

const schema = mongoose.Schema({
    uuid: { 
        type: String, 
    },
    executionId: { 
        type: String, 
    },
    monitoringId: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String
    },
    isSuccess: { 
        type: Boolean
    },
    startTime: { 
        type: Date
    },
    endTime: { 
        type: Date
    },
    errorOnSendEmail: { type: Object },
    errorOnSendWebhook: { type: Object },
    errorOnSendWebsocket: { type: Object },
    errorOnSendTelegram: { type: Object },
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('notifications', schema, config)
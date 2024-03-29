const config = require('../config/database-config')
const mongoose = require('../config/mongoose-multi-db')

const schema = mongoose.Schema({
    url: { 
        type: String,
        required: true
    },
    name: { 
        type: String
    },
    scriptTarget: { 
        type: String
    },
    scriptNavigate: { 
        type: String
    },
    scriptContent: {
        type: [{ type: String }],
        default: undefined    
    },
    filter: {
        threshold: { Number },
        words: {
            type: [{ type: String }],
            default: undefined    
        }
    },
    regularity: { 
        type: String 
    },
    mode: {
        type: String
    },
    disabled: {
        type: Boolean
    },
    options: {
        timeout: { type: Number },
        waitUntil: { type: String },
        enableUserAgentRandom: { type: Boolean },
        useJquery: { type: Boolean },
        scriptTagUrl: { type: String },
        waitTime: { type: Number },
        printscreen: { type: Boolean },
        printscreenFullPage: { type: Boolean },
        pdf: { type: Boolean },
        notifyChange: {type: Boolean},
        notifyUniqueChange: {type: Boolean},
        levelMax: { type: Number },
        proxy: { type: String },
        temporary: { type: Boolean },
        filterDomain: { type: Boolean },
        splitable: { type: Boolean }
    },
    notifications: [{
        _id: false,
        level: { type: Number },
		template: { type: String },
        websocket: { type: Boolean },
		email: {
            type: [{ type: String }],
            default: undefined
        },
		telegram: {
            type: [{
                _id: false,
                bot_token: { type: String },
                chat_id: { type: String },
            }],
            default: undefined,
        },
		webhook: {
            type: [{
                _id: false,
                url: { type: String }, 
                method: { type: String }
            }],
            default: undefined
        }
	}],
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    }   
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('monitorings', schema, config)

const mongoose = require("mongoose")

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
    scriptContent: [{
        type: String
    }],
    filter: {
        threshold: { Number },
        words: [{ type: String }]
    },
    regularity: { 
        type: String 
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
        notifyChange: {type: Boolean},
        notifyUniqueChange: {type: Boolean},
    },
    notifications: [{
		template: { type: String },
        websocket: { type: Boolean },
		email: [{ type: String }],
		telegram: [{
			bot_token: { type: String },
			chat_id: { type: String },
		}],
		webhook: [{
            url: { type: String }, 
            method: { type: String }
		}],
	}],
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    }   
}, { versionKey: false, timestamps: true })

const Monitoring = mongoose.model("monitorings", schema)

module.exports = Monitoring

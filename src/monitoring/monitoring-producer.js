const queue = require("../utils/queue")


const restartTriggerEvent = (data) => queue.sendToQueue("RESTAR_SCHEDULER_EVENT", data)

module.exports = {
    restartTriggerEvent
}
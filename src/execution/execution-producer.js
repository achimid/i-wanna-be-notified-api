const queue = require("../utils/queue")


const postExecution = (data) => queue.sendToQueue("EXECUTION_INCOMING", data)

module.exports = {
    postExecution
}
const queue = require("../utils/queue")


const postExecution = (data) => queue.sendToQueue("INCOMING", data)

module.exports = {
    postExecution
}
require('dotenv').config()
require('appmetrics-dash').attach()

const cors = require('cors')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

const routes = require('./config/routes')

const app = express()


app.use(cors())
app.use(compression())
app.use(bodyParser.json({limit: '20mb'}))
app.disable('x-powered-by')

// Initializations
routes(app)

app
    .listen(process.env.PORT)
    .setTimeout(parseInt(process.env.DEFAULT_TIMEOUT_REQUEST) * 1000 * 60)
require('dotenv').config()
require('appmetrics-dash').attach()

const cors = require('cors')
const express = require('express')
const compression = require('compression')

const routes = require('./config/routes')

const app = express()


app.use(cors())
app.use(compression())
app.use(express.json())
app.disable('x-powered-by')

// Initializations
routes(app)

app.listen(process.env.PORT)
require('dotenv').config()

const cors = require('cors')
const express = require('express')
const compression = require('compression')

const routes = require('./config/routes')
const { databaseInit } = require('./config/database')

const app = express()


app.use(cors())
app.use(compression())
app.use(express.json())
app.disable('x-powered-by')

// Initializations
routes(app)
    .then(databaseInit)

const Log = require('./log/log-model')
new Log({uuid: 'teste'}).save()


app.listen(process.env.PORT)
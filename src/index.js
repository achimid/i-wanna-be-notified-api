require('dotenv').config()

const cors = require('cors')
const express = require('express')
const compression = require('compression')

const routes = require('./config/routes')
const databaseInit = require('./config/database')

const app = express()


app.use(cors())
app.use(compression())
app.use(express.json())
app.disable('x-powered-by')

// Initializations
routes(app)
    .then(databaseInit)


// Front-End
const maxAge = process.env.NODE_ENV == 'production' ? 7*86400000 : 0
app.use(express.static('public', { maxAge, extensions:['html'] }))


app.listen(process.env.PORT)
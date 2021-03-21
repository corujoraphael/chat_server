'use strict'
require('dotenv').config()
const express     = require('express')
const swaggerUi   = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
const bodyParser  = require('body-parser')
const cors        = require('cors')
const app = express()

app.use(bodyParser.json({limit : "50mb"})); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit : "50mb", extended: true })); // support encoded bodies
app.use(cors({
     origin: "*",
     methods: ['GET', 'PUT', 'POST', 'DELETE'],
     allowedHeaders : ['Origin', 'X-Requested-With', 'content-type', 'Authorization', 'Token', 'Folder']
}));

const PORT = 8080

function onStart(){
    console.log(`Server running on port ${PORT}`)
}

app.listen(PORT, onStart)


app.use('/docs-api', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

module.exports = app


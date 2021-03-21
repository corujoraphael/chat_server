'use strict'

const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
const app = express()

const PORT = 8080


function onStart(){
    console.log(`Server running on port ${PORT}`)
}

app.listen(PORT, onStart)


app.use('/docs-api', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }))

const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

module.exports = app


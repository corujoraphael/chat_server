'use strict'
require('dotenv').config()
const express     = require('express')
const swaggerUi   = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
const bodyParser  = require('body-parser')
const cors        = require('cors')
const app = express()

app.use(bodyParser.json({limit : "50mb"})) // support json encoded bodies
app.use(bodyParser.urlencoded({ limit : "50mb", extended: true })) // support encoded bodies
app.use(cors({
     origin: "*",
     methods: ['GET', 'PUT', 'POST', 'DELETE'],
     allowedHeaders : ['Origin', 'X-Requested-With', 'content-type', 'Authorization', 'Token', 'Folder']
}))

const PORT = 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.use('/docs-api', swaggerUi.serve, swaggerUi.setup(swaggerFile))


const authRoute = require('./routes/auth')
app.use('/auth', authRoute)

const AuthController = require('./controllers/auth')
app.use(function(req, res, next) {   
    var token = req.headers["authorization"].replace("Bearer ", "")
    const success = result => {
    	if(result){
    		req.USER_ID             = result
            req.TOKEN               = req.headers.token
    		next()
    	} else
    		res.status(401).json({success: false, error : "Credenciais Inválidas"})
    }

    const error = error => res.status(401).json({success: false, error : "Ocorreu um erro na autenticação. "+error})

    AuthController.auth({ token, success, error, req, next})
})

const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

module.exports = app


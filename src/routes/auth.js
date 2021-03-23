'use strict'

const router = require('express').Router()

router.use(function timeLog(req, res, next) {
	next()
})

const AuthController = require('../controllers/auth.js')

router.route('/login')
	.post((req, res, next) => {
		/* 	#swagger.tags = ['Login']
			#swagger.description = 'Endpoint to login as a user'
			#swagger.produces = ['application/json']
			#swagger.parameters['body'] = {
				in: 'body',
				description: 'Login information.',
				required: true,
				schema: { 
					email: "jhondoe@gmail.com",
					password: "encryptedPassword" 
				}
			}
			#swagger.responses[200] = { 
				schema: { 'auth': true, 'token': 'string', 'user': {"$ref": "#/definitions/User"}},
				description: "Login realizado com sucesso." 
			}
			#swagger.responses[400] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Invalid params" 
			}
			#swagger.responses[404] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "User not found"
			}
			#swagger.responses[422] = { 
				description: "DataBase Error"
			}
		*/

		AuthController.login({
			data : req.body,
			success : data => {
				res.json(data).status(200).send()
			},
			error : (error,code) => {
				res.status(code).json({error : error})
			}
		})
	})

const UserController = require('../controllers/user.js')

router.route('/signup')
	.post((req, res, next) => {
		/* 	#swagger.tags = ['Login']
			#swagger.description = 'Endpoint to create a Login'
			#swagger.produces = ['application/json']
			#swagger.parameters['body'] = {
				in: 'body',
				description: 'SignUp information.',
				required: true,
				schema: { 
					name: "Jhon Doe",
					email: "jhondoe@gmail.com",
					password: "encryptedPassword" 
				}
			}
			#swagger.responses[200] = { 
				schema: { 'auth': true, 'token': 'string', 'user': {"$ref": "#/definitions/User"}},
				description: "Login realizado com sucesso." 
			}
			#swagger.responses[404] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Error on decode token" 
			}
		*/

		UserController.create({
			data : {...req.body, owner_id: req.USER_ID},
			success : data => {
				res.json(data).status(200).send()
			},
			error : (error,code) => {
				res.status(code).json({error : error})
			}
		})
		
	})

module.exports = router
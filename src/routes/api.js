'use strict'

const router = require('express').Router()

router.use(function timeLog(req, res, next) {
   //console.log('Api Route - Time: ', new Date().toUTCString())
	next()
})

const RoomController = require('../controllers/room.js')

router.route('/room')
	.post((req, res, next) => {
		/* 	#swagger.tags = ['Room']
			#swagger.description = 'Endpoint to create a user'
			#swagger.produces = ['application/json']
			#swagger.parameters['body'] = {
				in: 'body',
				description: 'Room information.',
				required: true,
				schema: { 
					$name: "Jhon Doe",
					$email: "jhondoe@gmail.com",
					$password: "encryptedPassword" 
				}
			}
			#swagger.security = [{
				"apiKeyAuth": []
			}] 

			#swagger.responses[200] = { 
				schema: { "$ref": "#/definitions/Room" },
				description: "Room created successfully." 
			}
			#swagger.responses[400] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Invalid params" 
			}
			#swagger.responses[404] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Room not found"
			}
			#swagger.responses[422] = { 
				description: "DataBase Error"
			}
		*/

		RoomController.create({
			data : {...req.body, user_id: req.USER_ID},
			success : data => {
				res.json(data).status(200).send()
			},
			error : (error,code) => {
				res.status(code).json({error : error})
			}
		})
		
	})
	.get(function(req, res, next) {
		/* 	#swagger.tags = ['Room']
			#swagger.description = 'Endpoint to get all users'
			#swagger.produces = ['application/json']
			#swagger.parameters['limit'] = {
				in: 'query',
				description: 'Quantity of users. (default is 50)',
			} 
			#swagger.parameters['offset'] = {
				in: 'query',
				description: 'Start before x users. (default is 0)',
			}
			#swagger.security = [{
				"apiKeyAuth": []
			}] 

			#swagger.responses[200] = { 
				schema: { $ref: "#/definitions/Rooms" },
				description: "Room updated successfully." 
			}
			#swagger.responses[400] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Invalid params" 
			}
			#swagger.responses[404] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Room not found"
			}
			#swagger.responses[422] = { 
				description: "DataBase Error"
			}
		*/

		RoomController.get({
			data : {...req.query, user_id: req.USER_ID},
			success : data => {
				res.json(data).status(200).send()
			},
			error : (error,code) => {
				res.status(code).json({error : error})
			}
		})
	})
	.put(function(req, res, next) {
		/*  #swagger.tags = ['Room']
			#swagger.description = 'Endpoint to change a user information'
			#swagger.produces = ['application/json']
			#swagger.parameters['body'] = {
				in: 'body',
				description: 'Room information.',
				schema: { 
					$id: 1,
					name: "Jhon Doe",
					email: "jhondoe@gmail.com"
				},
				required: true
			}
			#swagger.security = [{
				"apiKeyAuth": []
			}] 
			#swagger.responses[200] = { 
				schema: { "$ref": "#/definitions/Room" },
				description: "Get rooms was successfull." 
			}
			#swagger.responses[400] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Invalid params" 
			}
			#swagger.responses[404] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Room not found"
			}
			#swagger.responses[422] = { 
				description: "DataBase Error"
			}
		*/

		RoomController.update({
			data : {...req.body, user_id: req.USER_ID},
			success : data => {
				res.json(data).status(200).send()
			},
			error : (error,code) => {
				res.status(code).json({error : error})
			}
		})
	})
	.delete(function(req, res, next) {
		/*  #swagger.tags = ['Room']
			#swagger.description = 'Endpoint to delete a user'
			#swagger.parameters['id'] = {
				in: 'query',
				description: 'Room id.',
				type: 'integer',
				required: true,
			} 
			#swagger.security = [{
				"apiKeyAuth": []
			}] 
			#swagger.responses[200] = { 
				schema: 'string',
				description: "Room deleted successfully." 
			}
			#swagger.responses[400] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Invalid params" 
			}
			#swagger.responses[404] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Room not found"
			}
			#swagger.responses[422] = { 
				description: "DataBase Error"
			}
		*/

		RoomController.delete({
			data : {...req.query, user_id: req.USER_ID},
			success : data => {
				res.json(data).status(200).send()
			},
			error : (error,code) => {
				res.status(code).json({error : error})
			}
		})
	})


const MessageController = require('../controllers/message.js')

router.route('/Message')
	.post((req, res, next) => {
		/* 	#swagger.tags = ['Message']
			#swagger.description = 'Endpoint to create a user'
			#swagger.produces = ['application/json']
			#swagger.parameters['body'] = {
				in: 'body',
				description: 'Message information.',
				required: true,
				schema: { 
					$name: "Jhon Doe",
					$email: "jhondoe@gmail.com",
					$password: "encryptedPassword" 
				}
			}
			#swagger.security = [{
				"apiKeyAuth": []
			}] 
		*/

		MessageController.create({
			data : {...req.body, user_from_id: req.USER_ID},
			success : data => {
				res.json(data).status(200).send()
			},
			error : (error,code) => {
				res.status(code).json({error : error})
			}
		})
		
	})
	.get(function(req, res, next) {
		/* 	#swagger.tags = ['Message']
			#swagger.description = 'Endpoint to get all users'
			#swagger.produces = ['application/json']
			#swagger.parameters['limit'] = {
				in: 'query',
				description: 'Quantity of users. (default is 50)',
			} 
			#swagger.parameters['offset'] = {
				in: 'query',
				description: 'Start before x users. (default is 0)',
			}
			#swagger.security = [{
				"apiKeyAuth": []
			}] 

			#swagger.responses[200] = { 
				schema: { $ref: "#/definitions/Messages" },
				description: "Get messages was successfull." 
			}
			#swagger.responses[400] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Invalid params" 
			}
			#swagger.responses[404] = { 
				schema: { "$ref": "#/definitions/Errors" },
				description: "Message not found"
			}
			#swagger.responses[422] = { 
				description: "DataBase Error"
			}
		*/

		MessageController.get({
			data : {...req.query, user_id: req.USER_ID},
			success : data => {
				res.json(data).status(200).send()
			},
			error : (error,code) => {
				res.status(code).json({error : error})
			}
		})
	})

module.exports = router
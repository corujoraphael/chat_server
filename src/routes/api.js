'use strict';

const router = require('express').Router()

router.use(function timeLog(req, res, next) {
   //console.log('Api Route - Time: ', new Date().toUTCString())
    next()
})

const UserController = require('../controllers/user.js')

router.route('/users')
    .post((req, res, next) => {
    	/* 	#swagger.tags = ['User']
            #swagger.description = 'Endpoint to create a user'
            #swagger.produces = ['application/json']
            #swagger.parameters['body'] = {
	            in: 'body',
	            description: 'User information.',
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

        UserController.create({
            data : req.body,
            success : data => {
                res.json(data).status(200).send()
            },
            error : (error,code) => {
                res.status(code).json({error : error});
            }
        });
        
    })
    .get(function(req, res, next) {
    	/* 	#swagger.tags = ['User']
            #swagger.description = 'Endpoint to get all users'
            #swagger.produces = ['application/json']
            #swagger.parameters['limit'] = {
                in: 'query',
                description: 'Quantity of users. (default is 10)',
            } 
            #swagger.parameters['offset'] = {
                in: 'query',
                description: 'Start before x users. (default is 0)',
            }
        */

        UserController.get({
            data : req.query,
            success : data => {
                res.json(data).status(200).send()
            },
            error : (error,code) => {
                res.status(code).json({error : error});
            }
        })
    })
    .put(function(req, res, next) {
        /*  #swagger.tags = ['User']
            #swagger.description = 'Endpoint to change a user information'
            #swagger.produces = ['application/json']
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'User information.',
                schema: { 
                    $id: 1,
                    name: "Jhon Doe",
                    email: "jhondoe@gmail.com"
                },
                required: true
            }
            #swagger.responses[200] = { 
                schema: 'string',
                description: "User updated successfully." 
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

        UserController.update({
            data : req.body,
            success : data => {
                res.json(data).status(200).send()
            },
            error : (error,code) => {
                res.status(code).json({error : error});
            }
        })
    })
    .delete(function(req, res, next) {
        /*  #swagger.tags = ['User']
            #swagger.description = 'Endpoint to delete a user'
            #swagger.parameters['id'] = {
                in: 'query',
                description: 'User id.',
                type: 'integer',
                required: true,
            } 
            #swagger.responses[200] = { 
                schema: 'string',
                description: "User deleted successfully." 
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

        UserController.delete({
            data : req.query,
            success : data => {
                res.json(data).status(200).send()
            },
            error : (error,code) => {
                res.status(code).json({error : error});
            }
        })
    })

module.exports = router
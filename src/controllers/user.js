'use strict'

const { user, room } = require('../models')
const jwt = require('jsonwebtoken')
const SHA256 = require("crypto-js/sha256")

exports.get = params => {
	var success = params.success || function(){}
	var error   = params.error || function(){}
	var data    = params.data || {}

	user.findAll({
		offset: parseInt(data.offset) || null, 
		limit: parseInt(data.limit) || 50,
	},)
	.then( users => success(users))
	.catch( err => error(err, 422))

}

exports.create = function(params){
	var success = params.success || function(){}
	var error   = params.error || function(){}
	var data    = params.data || {}
	var count = 0

	data.password = SHA256(process.env.KEY_CRYPTO_SECRET + data.password).toString()

	user.create(data)
	.then( user => {
		const token = jwt.sign({...user.dataValues}, process.env.SECRET)
      	success({ auth: true, token: token, user })
    })
	.catch( err => error(err, 422))
}

exports.update = function(params){
	var data    = params.data || {}
	var success = params.success || function(){}
	var error   = params.error || function(){}

	if (!data.id || !parseInt(data.id))
		return error({message: "Parâmetros incorretos", errCode: 'invalid_params'}, 400)
	
	delete data.password

	user.findByPk(data.id).then( user => {
		user.update(data)
		.then( users => success('Usuário modificado com sucesso'))
		.catch( err => error(err, 422))
	}).catch(err => error({message: "Usuário não encontrado", errCode: 'not_found'}, 404))
}

exports.delete = function(params){
	var data    = params.data || {}
	var success = params.success || function(){}
	var error   = params.error || function(){}

	if (!data.id || !parseInt(data.id))
		return error({message: "Parâmetros incorretos", errCode: 'invalid_params'}, 400)
	
	delete data.password

	user.findByPk(data.id).then( user => {
		user.destroy()
		.then( users => success('Deletado com sucesso'))
		.catch( code => error(err, 422))
	}).catch(err => error({message: "Usuário não encontrado", errCode: 'not_found'}, 404))
}



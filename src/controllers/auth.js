'use strict'

const { user } = require('../models')
const jwt = require('jsonwebtoken')
const SHA256 = require("crypto-js/sha256")

exports.login = params => {
	var success = params.success || function(){}
	var error   = params.error || function(){}
	var data    = params.data || {}

	if (!data.email || data.email == '' || !data.password || data.password == '')
		return error({message: "Parâmetros incorretos", errCode: 'invalid_params'}, 400)

	user.findOne({
		where: {
			email: data.email,
			password: SHA256(process.env.KEY_CRYPTO_SECRET + data.password).toString()
		}
	},)
	.then( user => {
		if (!user) return error({message: "Usuário não existe", errCode: 'not_exists'}, 404)
		
		const token = jwt.sign({...user.dataValues}, process.env.SECRET)
      	success({ auth: true, token: token, user })
	})
	.catch( err => error(err, 422))

}

exports.auth = params => {
	var success = params.success || function(){}
	var error   = params.error || function(){}
	var token    = params.token || null

    if (!token) return error('Token não informado.')
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
   		if (err) return error('Falha ao autenticar o token.', 404)
      	
      	success(decoded.id)
    })
}
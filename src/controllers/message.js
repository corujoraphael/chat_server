'use strict'
const axios = require('axios')
const { message, users, room } = require('../models')
const Op = require('sequelize').Op

exports.get = params => {
	var success = params.success || function(){}
	var error   = params.error || function(){}
	var data    = params.data || {}
	var userId  = data.user_id
	delete data.user_id

	message.findAll({
		offset: parseInt(data.offset) || null, 
		limit: parseInt(data.limit) || 50,
		where: data,
		include: ['user_from', 'room'],
		order: [
			['createdAt', 'DESC']
		]
	})
	.then( messages => {
		if (messages[0] && messages[0].room.user_to_id && messages[0].room.user_to_id != userId && messages[0].room.owner_id != userId )
			return error('Not authorized', 401)
		success(messages)
	})
	.catch( err => error(err, 422))

}

exports.create = function(params){
	var success = params.success || function(){}
	var error   = params.error || function(){}
	var data    = params.data || {}

	room.findByPk(data.room_id)
	.then( room => {
		room = room.dataValues
		if (!room.user_to_id || room.user_to_id == data.user_from_id || room.owner_id == data.user_from_id){
			message.create(data)
			.then( msg => {
				message.findByPk(msg.id, {
					include: ['user_from']
				})
				.then( message => {
					success(message)
					axios.post('http://localhost:3001/emit-message', {
						message,
						key: 'Kw58Vxu1Xm',
						room_id: msg.room_id
					})
				})
				.catch( err => error(err, 422))
			})
			.catch( err => error(err, 422))
		} else
			error('Not authorized', 401)
	})
}

exports.update = function(params){
	var data    = params.data || {}
	var success = params.success || function(){}
	var error   = params.error || function(){}

	if (!data.id || !parseInt(data.id))
		return error({message: "Parâmetros incorretos", errCode: 'invalid_params'}, 400)
	
	message.findByPk(data.id).then( message => {
		message.update(data)
		.then( message => success('Mensagem modificada com sucesso'))
		.catch( err => error(err, 422))
	}).catch(err => error({message: "Mensagem não encontrada", errCode: 'not_found'}, 404))
}

exports.delete = function(params){
	var data    = params.data || {}
	var success = params.success || function(){}
	var error   = params.error || function(){}

	if (!data.id || !parseInt(data.id))
		return error({message: "Parâmetros incorretos", errCode: 'invalid_params'}, 400)
	
	message.findByPk(data.id).then( message => {
		message.destroy()
		.then( message => success('Deletada com sucesso'))
		.catch( code => error(err, 422))
	}).catch(err => error({message: "Mensagem não encontrado", errCode: 'not_found'}, 404))
}



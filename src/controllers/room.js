'use strict'

const { room, user, message } = require('../models')
const { Op } = require('sequelize')

exports.get = params => {
	var success = params.success || (() => {})
	var error   = params.error || (() => {})
	var data    = params.data || {}
	
	if (typeof data.onlyGroup !== 'undefined'){
		data.user_to_id = {
			[Op.is]: null 
		}
		if (data.onlyGroup != 'true'){
			data = {
				...data,
				user_to_id: {
					[Op.not]: null 
				},
				[Op.or]: [
	      			{ user_to_id: data.user_id },
	      			{ owner_id: data.user_id }
	    		]		
	    	}
		}

		delete data.onlyGroup
		delete data.user_id
	}

	room.findAll({
		offset: parseInt(data.offset) || null, 
		limit: parseInt(data.limit) || 50,
		where: data,
		include: ['owner', 'user_to'],
		order: [
			['createdAt', 'desc']
		]
	})
	.then( rooms => success(rooms))
	.catch( err => error(err, 422))

}

const create = (data, success, error) => {
	data.owner_id = data.user_id
	room.create(data)
		.then( room => success(room))
		.catch( err => error(err, 422))
}

exports.create = params => {
	var success = params.success || (() => {})
	var error   = params.error || (() => {})
	var data    = params.data || {}
	
	if (!data.user_to_id && (!data.name || data.name == ''))
		return error({message: "Parâmetros incorretos", errCode: 'invalid_params'}, 400)

	if (data.user_to_id)
		room.findOne({
			where: { 
				[Op.and]: [
					{
						[Op.or]: [
							{'owner_id': data.user_id},
							{'user_to_id': data.user_id}
						]
					},
					{
						[Op.or]: [
							{'owner_id': data.user_to_id},
							{'user_to_id': data.user_to_id}
						]
					}
				]
			}
		}).then(room => {
			if (room)
				return success(room)
			create(data, success, error)
		})
	else
		create(data, success, error)
		
}

exports.update = params => {
	var data    = params.data || {}
	var success = params.success || (() => {})
	var error   = params.error || (() => {})

	if (!data.id || !parseInt(data.id))
		return error({message: "Parâmetros incorretos", errCode: 'invalid_params'}, 400)
	
	room.findByPk(data.id).then( room => {

		if (room.owner_id == data.user_id)
			return room.update(data)
				.then( room => success(room))
				.catch( err => error(err, 422))
		error({message: "Você não tem permissão", errCode: 'not_allowed'}, 401)
	}).catch(err => error({message: "Sala não encontrada", errCode: 'not_found'}, 404))
}

exports.delete = params => {
	var data    = params.data || {}
	var success = params.success || (() => {})
	var error   = params.error || (() => {})

	if (!data.id || !parseInt(data.id))
		return error({message: "Parâmetros incorretos", errCode: 'invalid_params'}, 400)
	
	room.findByPk(data.id).then( room => {
		if (room.owner_id == data.user_id)
			return room.destroy()
				.then( rooms => success('Deletada com sucesso'))
				.catch( code => error(err, 422))
		error({message: "Você não tem permissão", errCode: 'not_allowed'}, 401)
	}).catch(err => error({message: "Sala não encontrado", errCode: 'not_found'}, 404))
}



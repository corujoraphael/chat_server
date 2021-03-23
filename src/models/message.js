'use strict'

module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define('message', {
		user_from_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: true,
				notEmpty: true
			},
		},
		room_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: true,
				notEmpty: true
			}
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: true,
				notEmpty: true,
			}
		}
	}, {
		paranoid: true,
		defaultScope: {
			attributes: { 
				exclude: ['updatedAt', 'deletedAt'] 
			},
		}
	})

	Message.associate = models => {
		Message.belongsTo(models.user, {foreignKey: 'user_from_id', as: 'user_from'})
		Message.belongsTo(models.room, {foreignKey: 'room_id', as: 'room'})
	}


	return Message
}
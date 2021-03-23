'use strict'

module.exports = (sequelize, DataTypes) => {
	const Room = sequelize.define('room', {
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		owner_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: true,
				notEmpty: true,
			}
		},
		user_to_id: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		paranoid: true,
		defaultScope: {
			attributes: { 
				exclude: ['createdAt', 'updatedAt', 'deletedAt'] 
			},
		},
		hooks: {
            afterDestroy: (instance, options) => instance.getMessages().then(messages => messages.map(msg => msg.destroy()))
        }
	})

	Room.associate = models => {
		Room.belongsTo(models.user, {foreignKey: 'user_to_id', as: 'user_to'})
		Room.belongsTo(models.user, {foreignKey: 'owner_id', as: 'owner'})
		Room.hasMany(models.message, {foreignKey: 'room_id', as: 'messages', onDelete: 'cascade'})
	}

	return Room
}
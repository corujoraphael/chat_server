'use strict'

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: true,
				notEmpty: true
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: true,
				notEmpty: true,
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
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
				exclude: ['password', 'updatedAt', 'deletedAt'] 
			},
		}
	})


	User.associate = models => User.hasMany(models.room, {foreignKey: 'user_to_id', as: 'rooms', onDelete: 'cascade'})

	return User
}
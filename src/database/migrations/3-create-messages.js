'use strict'

module.exports = {
	up: (queryInterface, DataTypes) => {
		return queryInterface.createTable('messages', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			user_from_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			room_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: 'rooms',
					key: 'id'
				}
			},
			body: {
				allowNull: false,
				type: DataTypes.TEXT,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			deletedAt: {
				type: DataTypes.DATE,
				allowNull: true
			}
		}, {
			timestamp: true, 
			paranoid: true
		})
	},

	down: (queryInterface) => {
		return queryInterface.dropTable('messages')
	}
}
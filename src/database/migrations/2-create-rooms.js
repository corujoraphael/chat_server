'use strict'

module.exports = {
	up: (queryInterface, DataTypes) => {
		return queryInterface.createTable('rooms', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			description: {
				allowNull: true,
				type: DataTypes.TEXT,
			},
			owner_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			user_to_id: {
				allowNull: true,
				type: DataTypes.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				}
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
		return queryInterface.dropTable('rooms')
	}
}
'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  });

  return User;
}
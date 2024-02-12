const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Token extends Model {}

Token.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: 'users', key: 'username' },
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'token'
})

module.exports = Token
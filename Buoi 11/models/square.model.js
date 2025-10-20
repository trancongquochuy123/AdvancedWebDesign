const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');

const Square = sequelize.define('Square', {
  canh: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  chuvi: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dientich: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'table_square',
  timestamps: false
});

module.exports = Square;

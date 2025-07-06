const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Category = require('./Category');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  evenment: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  statut: {
    type: DataTypes.ENUM('pending', 'validated', 'rejected', 'deleted'),
    defaultValue: 'pending'
  },
  attachment_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
    is_anonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    defaultValue: 'male'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'Reports'
});

Report.belongsTo(User, { foreignKey: 'user_id', onDelete: 'SET NULL' });
Report.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'RESTRICT' });

module.exports = Report;
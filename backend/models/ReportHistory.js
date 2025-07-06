const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Report = require('./Report');
const User = require('./User');

const ReportHistory = sequelize.define('ReportHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    report_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM('created', 'updated', 'validated', 'rejected', 'deleted'),
        allowNull: false,
        recommender: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }}, {
        timestamps: false,
        tableName: 'ReportHistory'
    });

ReportHistory.belongsTo(Report, { foreignKey: 'report_id', onDelete: 'CASCADE' });
ReportHistory.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = ReportHistory;
const sequelize = require('../config/db');
const User = require('./User');
const Category = require('./Category');
const Report = require('./Report');
const Comment = require('./Comment');
const ReportHistory = require('./ReportHistory');
const Notification = require('./Notification');

// Définir les relations
User.hasMany(Report, { foreignKey: 'user_id' });
Category.hasMany(Report, { foreignKey: 'category_id' });
Report.hasMany(Comment, { foreignKey: 'report_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
Report.hasMany(ReportHistory, { foreignKey: 'report_id' });
User.hasMany(ReportHistory, { foreignKey: 'user_id' });
User.hasMany(Notification, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Category,
  Report,
  Comment,
  ReportHistory,
  Notification
};
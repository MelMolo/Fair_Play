const { sequelize, User, Category, Report, Comment, ReportHistory, Notification } = require('../models');

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie.');
    await sequelize.sync({ force: true }); // force: true pour recréer les tables
    console.log('Base de données synchronisée.');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

initDb();
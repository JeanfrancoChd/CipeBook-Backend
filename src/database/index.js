const Sequelize = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize('CipeBookDataBase',process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

module.exports = sequelize;

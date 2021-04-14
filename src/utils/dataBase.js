const Sequelize = require("sequelize");
const config = require("./env");

const SCHEMA_NAME = config.DBNAME;
const USER_NAME = config.DBUSER;
const PASSWORD = config.DBPASS;

const sequelize = new Sequelize(SCHEMA_NAME, USER_NAME, PASSWORD, {
  host: config.DBHOST,
  dialect: "mysql",
});

module.exports = sequelize;

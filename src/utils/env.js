const dotenv = require("dotenv");
const path = require("path");

const root = path.join.bind(this, __dirname, "../../env");
dotenv.config({
  path: root(`${process.env.NODE_ENV === "prod" ? ".env.prod" : ".env.dev"}`),
});

module.exports = {
  MOD: process.env.NODE_ENV,
  PORT: process.env.PORT || 8000,
  DBNAME: process.env.DBNAME,
  DBUSER: process.env.DBUSER,
  DBPASS: process.env.DBPASS,
  DBHOST: process.env.DBHOST,
  BOT_TOKEN: process.env.BOT_TOKEN,
};

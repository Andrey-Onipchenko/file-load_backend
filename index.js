const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./src/utils/dataBase");
const config = require("./src/utils/env");

const hutorokEasterPhoto = require("./src/routes/hutorokEasterPhoto");
const bot = require("./src/tgBot/bot");
const app = express();
var corsOptions = {
  origin: ["https://pascha.smak.ua", "http://localhost:8080"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use("/api/hutorok/easter/", hutorokEasterPhoto);

async function start() {
  try {
    await sequelize.sync();
    app.listen(config.PORT, () => {
      console.log(`Server run mod ${config.MOD}... PORT:${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
bot.launch();

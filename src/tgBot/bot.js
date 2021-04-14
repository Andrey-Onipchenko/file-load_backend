const { Telegraf } = require("telegraf");
const excel = require("exceljs");
// const { unlinkSync } = require("fs");
const userModel = require("../model/hutorokEasterPhoto");
const config = require("../utils/env");
module.exports = bot = new Telegraf(config.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome to ray"));
bot.hears("хуторок-пасха", async (ctx) => {
  userModel.count().then((count) => {
    ctx.reply(`Количество учасников ${count}`);
  });
});
bot.hears("хуторок-пасха-док", async (ctx) => {
  const user = await userModel.findAll();
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("hutorok-data");
  const dataParse = JSON.parse(JSON.stringify(user));
  worksheet.columns = [
    {
      header: "Имя",
      key: "name",
      width: 30,
    },
    {
      header: "Телефон",
      key: "phone",
      width: 30,
    },
    {
      header: "Дата реєстрації",
      key: "createdAt",
      width: 30,
    },
  ];

  worksheet.addRows(dataParse);

  const source = "./hutorok2-data.xlsx";
  workbook.xlsx.writeFile(source).then(() => {
    ctx.replyWithDocument({ source });
  });
  // .finally(() => unlinkSync(source));
});

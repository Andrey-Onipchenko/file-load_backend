const { Router } = require("express");
const multer = require("multer");
const userModel = require("../model/hutorokEasterPhoto");
const path = require("path");
const fs = require("fs");

const router = Router();
router.get("/photo", async (req, res) => {
  const users = await userModel.findAll();
  res.send(users);
});

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "/uploads",
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { name, phone } = req.body;
    const tempPath = req.file.path;
    const imgPath = path.join(
      __dirname,
      `../../uploads/hutorokPascha/${phone}.png`
    );
    const user = await userModel.findOne({ where: { phone } });
    if (user) {
      res.json({
        status: 0,
        msg: "Пользователь с таким Телефоном уже существует",
      });
    } else {
      const createUser = await userModel.create({
        name,
        phone,
        imgPath,
      });
      fs.rename(tempPath, imgPath, (err) => {
        if (err) return handleError(err, res);
        res
          .status(200)
          .contentType("text/plain")
          .json({ status: 1, msg: "Вітаємо! Ви зареєстровані" });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

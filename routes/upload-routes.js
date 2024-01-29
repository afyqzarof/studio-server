const router = require("express").Router();
const sharp = require("sharp");
const path = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// const upload = multer({ storage: storage });

// router.post("/", upload.single("file"), (req, res) => {
//   res.send({ filename: req.file.filename });
// });

// const storage = multer.diskStorage({
//   destination: (req, file, done) => {
//     done(null, UPLOAD_PATH);
//   },
//   filename: (req, file, done) => {
//     done(null, uuid() + "___" + file.originalname);
//   },
// });
const limits = {
  fileSize: 5 * 1024 * 1024,
};
const fileFilter = (req, file, done) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    done(null, true);
  } else {
    done(new Error("file type not supported"), false);
  }
};
const UPLOAD_PATH = path.join(__dirname, "../uploads");
const upload = multer({
  storage,
  limits,
  fileFilter,
}).single("file");

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    try {
      const { file } = req;
      if (!file) {
        return res
          .status(400)
          .json({ success: false, message: "file not supplied" });
      }
      const newFilePath = path.join(
        UPLOAD_PATH,
        Date.now() + path.extname(file.originalname)
      );
      // save newFilePath in your db as image path
      await sharp(file.path).resize().jpeg({ quality: 50 }).toFile(newFilePath);
      fs.unlinkSync(file.path);
      return res
        .status(200)
        .json({
          success: true,
          message: "image uploaded",
          filename: req.file.filename,
        });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });
});
module.exports = router;

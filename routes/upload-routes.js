const router = require("express").Router();
// const userController = require("../controllers/user-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), (req, res) => {
  res.send("upload successful");
});

module.exports = router;

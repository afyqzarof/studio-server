const router = require("express").Router();
const uploadController = require("../controllers/upload-controller");

router.route("/").post(uploadController.uploadImg);
router.route("/thumbnail").post(uploadController.uploadThumbnail);

module.exports = router;

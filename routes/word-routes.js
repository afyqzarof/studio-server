const router = require("express").Router();
const wordController = require("../controllers/word-controller.js");

router.route("/:word/definition").get(wordController.getDef);

module.exports = router;

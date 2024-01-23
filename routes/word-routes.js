const router = require("express").Router();
const wordController = require("../controllers/word-controller.js");

router.route("/:word/definition").get(wordController.getDef);
router.route("/:word/synonym").get(wordController.getSynonym);
router.route("/:word/antonym").get(wordController.getAntonym);

module.exports = router;

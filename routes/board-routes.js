const router = require("express").Router();
const boardController = require("../controllers/board-controller");

router.route("/:boardId/pins").get(boardController.getPins);

module.exports = router;

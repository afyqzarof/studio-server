const router = require("express").Router();
const boardController = require("../controllers/board-controller");

router.route("/:boardId/pins").get(boardController.getPins);
router.route("/:boardId").get(boardController.getBoardDetails);

module.exports = router;

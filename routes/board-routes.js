const router = require("express").Router();
const boardController = require("../controllers/board-controller");

router.route("/public").get(boardController.getPublicBoards);
router.route("/new").post(boardController.newBoard);
router.route("/:boardId/pins").get(boardController.getPins);
router.route("/:boardId").get(boardController.getBoardDetails);

module.exports = router;

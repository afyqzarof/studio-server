import express from "express";
import boardController from "../controllers/board.controller";

const router = express.Router();

router.route("/public").get(boardController.getPublicBoards);
router.route("/new").post(boardController.newBoard);
router.route("/save").patch(boardController.saveBoard);
router.route("/:boardId/pins").get(boardController.getPins);
router.route("/:boardId/pins").patch(boardController.savePins);
router.route("/:boardId").get(boardController.getBoardDetails);
router.route("/:boardId").delete(boardController.deleteBoard);

export default router;

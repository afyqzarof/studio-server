import express from "express";
import wordController from "../controllers/word.controller";
const router = express.Router();

router.route("/:word/definition").get(wordController.getDef);
router.route("/:word/synonym").get(wordController.getSynonym);
router.route("/:word/antonym").get(wordController.getAntonym);
router.route("/:word/rhyme").get(wordController.getRhyme);

export default router;

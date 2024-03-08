import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/").get(userController.index);
router.route("/").patch(userController.updateDetails);
router.route("/boards").get(userController.getBoards);

export default router;

import express from "express";
const router = express.Router();
// const userController = require("../controllers/user-controller");
import userController from "../controllers/user.controller";

router.route("/").get(userController.index);
router.route("/").patch(userController.updateDetails);
router.route("/boards").get(userController.getBoards);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

// module.exports = router;
export default router;

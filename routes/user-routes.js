const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/").get(userController.index);
router.route("/boards").get(userController.getBoards);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;

const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/").get(userController.index);
router.route("/:userId/boards").get(userController.getBoards);

module.exports = router;

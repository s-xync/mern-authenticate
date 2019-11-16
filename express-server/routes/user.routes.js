const router = require("express").Router();
const UserControllers = require("../controllers/user.controllers");

router.post("/login", UserControllers.login);
router.post("/signup", UserControllers.signup);

module.exports = router;

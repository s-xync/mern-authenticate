const router = require("express").Router();
const UserControllers = require("../controllers/user.controllers");
const { check } = require("express-validator");

router.post("/login", UserControllers.login);
router.post(
  "/signup",
  [
    check("email") // required + email
      .isEmail()
      .withMessage("Please enter valid email address."),
    check("password") // required + min length 5
      .isLength({ min: 5 })
      .withMessage("Please enter a password with atleast 5 characters")
  ],
  UserControllers.signup
);

module.exports = router;

const router = require("express").Router();
const UserControllers = require("../controllers/user.controllers");
const { check } = require("express-validator");

router.post(
  "/login",
  [
    check("email") // required + email
      .isEmail()
      .withMessage("Please enter valid email address.")
  ],
  UserControllers.login
);
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
router.post(
  "/verifyotp",
  [
    check("email") // required + email
      .isEmail()
      .withMessage("Please enter valid email address."),
    check("otp") // required + length 6
      .isLength({ min: 6, max: 6 })
      .withMessage("Please enter a OTP that is 6 digits.")
  ],
  UserControllers.verifyOtp
);

module.exports = router;

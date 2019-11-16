const User = require("../models/user.model");
const HttpStatus = require("http-status-codes");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const login = async (req, res) => {
  console.log("login route");
  res.json({ message: "Login route" });
};

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: errors.array()
      });
    }

    let { email, password } = req.body;

    email = email.toLowerCase();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({
          success: false,
          errors: [{ msg: "User Already Exists. Please Login." }]
        });
    }

    password = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ email, password });

    return res.json({
      success: true,
      message: "User Created Successfully.",
      user
    });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [{ msg: "Internal Server Error" }]
    });
  }
};

module.exports = { login, signup };

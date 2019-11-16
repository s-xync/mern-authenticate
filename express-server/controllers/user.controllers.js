const User = require("../models/user.model");
const HttpStatus = require("http-status-codes");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const otplib = require("otplib");

const { mailgunHelper } = require("../config/mailgun");

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
      if (!userExists.verified) {
        const otp = otplib.authenticator.generate(userExists.email);

        const mailData = {
          from: process.env.MAILGUN_FROM,
          to: userExists.email,
          subject: `Your OTP is ${otp}`,
          text: `Your OTP for MERN Authentication is ${otp}`
        };

        await mailgunHelper.messages().send(mailData);

        return res.json({
          success: true,
          message: "User already exists. OTP sent to your email.",
          userExists
        });
      }

      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: [{ msg: "User already exists. Please login." }]
      });
    }

    password = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ email, password });

    const otp = otplib.authenticator.generate(user.email);

    const mailData = {
      from: process.env.MAILGUN_FROM,
      to: user.email,
      subject: `Your OTP is ${otp}`,
      text: `Your OTP for MERN Authentication is ${otp}`
    };

    await mailgunHelper.messages().send(mailData);

    return res.json({
      success: true,
      message: "User created successfully. OTP sent to your email.",
      user
    });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [{ msg: "Internal server error" }]
    });
  }
};

module.exports = { login, signup };

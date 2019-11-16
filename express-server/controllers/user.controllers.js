const User = require("../models/user.model");
const HttpStatus = require("http-status-codes");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const { mailgunHelper } = require("../config/mailgun");
const { otplibAuthenticator } = require("../config/otplib");

const login = async (req, res) => {
  console.log("login route");
  res.json({ msg: "Login route" });
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

    if (userExists && !userExists.verified) {
      const otp = otplibAuthenticator.generate(userExists.email);

      const mailData = {
        from: process.env.MAILGUN_FROM,
        to: userExists.email,
        subject: `Your OTP is ${otp}`,
        text: `Your OTP for MERN Authentication is ${otp}`
      };

      await mailgunHelper.messages().send(mailData);

      return res.json({
        success: true,
        msg: "User already exists. OTP sent to your email.",
        userExists
      });
    }

    if (userExists && userExists.verified) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: [{ msg: "User already exists. Please login." }]
      });
    }

    password = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ email, password });

    const otp = otplibAuthenticator.generate(user.email);

    const mailData = {
      from: process.env.MAILGUN_FROM,
      to: user.email,
      subject: `Your OTP is ${otp}`,
      text: `Your OTP for MERN Authentication is ${otp}`
    };

    await mailgunHelper.messages().send(mailData);

    return res.json({
      success: true,
      msg: "User created successfully. OTP sent to your email.",
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

const verifyOtp = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: errors.array()
      });
    }

    let { email, otp } = req.body;

    email = email.toLowerCase();

    const userExists = await User.findOne({ email });

    if (userExists && !userExists.verified) {
      console.log(otp, userExists.email);
      const isValid = otplibAuthenticator.verify({
        token: otp,
        secret: userExists.email
      });

      if (!isValid) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: [{ msg: "Invalid OTP. Please check OTP and try again." }]
        });
      }

      userExists.verified = true;

      await userExists.save();

      const jwtToken = jwt.sign(
        { _id: String(userExists._id), email: userExists.email },
        process.env.JWT_SECRET
      );

      return res.json({
        success: true,
        msg: "Registered successfully. Logged in successfully.",
        user: userExists,
        jwt: jwtToken
      });
    }

    if (userExists && userExists.verified) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        errors: [{ msg: "User already exists. Please login." }]
      });
    }

    return res.status(HttpStatus.NOT_FOUND).json({
      success: false,
      errors: [{ msg: "User not found. Please signup." }]
    });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [{ msg: "Internal server error" }]
    });
  }
};

module.exports = { login, signup, verifyOtp };

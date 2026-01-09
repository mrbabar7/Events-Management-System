const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const AuthModel = require("../models/authModel");
exports.postSignup = [
  check("userName")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 3 })
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must be alphabetic.")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address.")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("Invalid email format.")
    .normalizeEmail(),

  // Contact validation: required, digits only, 10-11 characters
  check("contact")
    .notEmpty()
    .withMessage("Contact is required.")
    .isLength({ min: 11, max: 11 })
    .withMessage("Contact must be 11 digits long.")
    .matches(/^[0-9]+$/)
    .withMessage("Contact must contain digits only."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long.")
    .matches(/^[a-zA-Z0-9!@#$%^&*,]+$/)
    .withMessage("Password should include alphanumeric and special characters.")
    .trim(),
  (req, res, next) => {
    const { userName, email, contact, password } = req.body;
    console.log(userName, email, contact, password);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Send an array of errors with param and msg so front-end can display them per-field
      return res.status(422).json({ errors: errors.array() });
    }
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const userSignup = new AuthModel({
          userName,
          email,
          contact,
          password: hashedPassword,
        });
        console.log("sent to database :", userSignup);
        userSignup.save();
        res.status(201).json(userSignup);
      })
      .catch((err) => {
        console.log("error while signup", err);
        return res
          .status(500)
          .json({ message: "Signup failed", error: err.message });
      });
  },
];
exports.postLogin = [
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address.")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("Invalid email format.")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long.")
    .matches(/^[a-zA-Z0-9!@#$%^&*,]+$/)
    .withMessage("Password should include alphanumeric and special characters.")
    .trim(),
  async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = await AuthModel.findOne({ email });
    const assFinding = await bcrypt.compare(password, user.password);
    if (assFinding) {
      req.session.isLogged = true;
      req.session.user = user;
      await req.session.save();
      res.status(201).json(user);
    } else {
      res.status(500).json({ message: "Login Failed" });
    }
  },
];

exports.checkUser = (req, res, next) => {
  if (req.session.isLogged) {
    return res.status(200).json({ isLogged: true, user: req.session.user });
  } else {
    return res.status(200).json({ isLogged: false });
  }
};
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.status(200).json({ isLogged: false });
  });
};

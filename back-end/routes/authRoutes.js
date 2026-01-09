const express = require("express");
const authRouter = express.Router();
const authControl = require("../controllers/authController");
authRouter.post("/signup", authControl.postSignup);
authRouter.post("/login", authControl.postLogin);
authRouter.get("/check-user", authControl.checkUser);
authRouter.post("/logout", authControl.postLogout);
exports.authRouter = authRouter;

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
// const { route } = require("./listing");
const passport = require("passport");
const { saveRedirectUrl }= require("../middleware.js");

const userController= require("../controller/users.js")
// Sign UP

router.route("/signup")
.get(userController.signUpForm)
.post(wrapAsync(userController.signUp));

router.route("/login")
.get(userController.loginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect : "/login", failureFlash : true}),userController.login);

// router.get("/signup", userController.signUpForm);

// router.post("/signup", wrapAsync(userController.signUp));

// Login Page

// router.get("/login", userController.loginForm)

// router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect : "/login", failureFlash : true}),userController.login);


// Logout page

router.get("/logout",userController.logout);


module.exports = router;
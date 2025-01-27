const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
// const { route } = require("./listing");
const passport = require("passport");
const { saveRedirectUrl }= require("../middleware.js");

// Sign UP
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs")
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome To Wanderlust!");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}))


// Login Page

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect : "/login", failureFlash : true}),async(req, res) => {
    req.flash("success","Welcome to Wanderlust! You are Logged in! ")
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});


// Logout page

router.get("/logout",(req,res)=>{
  req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","You Are Logged Out Now!");
      res.redirect("/listings");
  })  
})


module.exports = router;
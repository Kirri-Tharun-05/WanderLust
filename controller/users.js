const User= require("../models/user");

module.exports.signUpForm=(req, res) => {
    res.render("users/signup.ejs")
}
module.exports.signUp=async (req, res) => {
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
}

module.exports.loginForm=(req, res) => {
    res.render("users/login.ejs");
}
module.exports.login=async(req, res) => {
    req.flash("success","Welcome to Wanderlust! You are Logged in! ")
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
          return next(err);
        }
        req.flash("success","You Are Logged Out Now!");
        res.redirect("/listings");
    })  
  }
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

// console.log(process.env);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const listingsRouter= require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter= require("./routes/user.js");
const session= require("express-session");
const connectMongo=require("connect-mongo");
const falsh=require("connect-flash");
const passport = require("passport");
const LocalStrategy= require("passport-local");
const User = require("./models/user.js")

const dbUrl=process.env.ATLASDB_URL;

// storing the cookies related information in AtlusDB
const store= connectMongo.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24* 3600,
});

store.on("error",()=>{
    console.log("Error in Mongo Session Store" , err);
})
const sessionOption ={
    store, 
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires : Date.now()+7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly: true 
    }
}


app.use(session(sessionOption));
app.use(falsh());

// authentication p
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.engine('ejs', ejsMate);
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // parse URL-encoded data from incoming requests.
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg =req.flash("error");
    res.locals.currUser=req.user;
    // console.log(res.locals.successMsg);
    next();
})

// demo-ouser

app.get("/demouser",async(req,res)=>{
    let fakeuser=new User({
        email : "tharunprajitha2017@gmail.com",
        username : "Kirri_tharun",
    })

    let registerdeUser = await User.register(fakeuser,"helloTharun"); 
    console.log(registerdeUser);
    res.send(registerdeUser);
})

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

//connecting To mongoDB.
// const mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => { console.log("Connection Successful") }).catch((err) => { err });

async function main() {
    await mongoose.connect(dbUrl);
    // await mongoose.connect(mongo_URL);
}

// app.get("/", (req, res) => {
//     res.send("HI its Working")
// })

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next) => {
    console.log(err);
    let { status = 400, message = "Something Went Wrong" } = err;
    res.status(status).render("listings/errors.ejs", { message });
    // res.status(status).send(message);
})

app.listen(port, () => {
    console.log(`Server is listening to port : ${port}`);
})
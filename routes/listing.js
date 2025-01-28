const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js')
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const {storage}=require("../cloudConfig.js");
// Using multer to work with images in form of file

const multer= require("multer");
const upload=multer({storage});  // using cloudinary to store in cloud storage
// const upload=multer({dest : "uploads/"});  // using the folder feature for temporary purpose
// futher we will use cloud service where the image will be uploaded




// Using MVC framework
// implementing  MVC : Model , View, Controller methodology which make the code more easy to understand

// in this we also user the Router.route funtionality

const listingController=require("../controller/listings.js")
// server side validation 

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));
// .post(,(req,res)=>{
//     res.send(req.file);    
// });

// /new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

// index route
// router.get("/", wrapAsync(listingController.index));

// show route
// router.get("/:id", wrapAsync(listingController.showListing));

// Creat Route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));

// edit
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editForm));

// update
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

// delete
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

module.exports =router;
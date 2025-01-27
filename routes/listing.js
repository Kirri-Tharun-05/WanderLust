const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js')
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
// server side validation 


router.get("/", wrapAsync(async (req, res) => {
    const all_Listings = await Listing.find({});
    res.render("listings/index.ejs", { all_Listings });
}));


router.get("/new",isLoggedIn,(req, res) => {  
    res.render("listings/new.ejs");
});

// show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
        req.flash("error","Listing you requested, Does not exist!");
        res.redirect("/listings");
    }
    // console.log(listing);
    // console.log(req.user);
    res.render("listings/show.ejs", { listing });
}));

// Creat Route
router.post("/",isLoggedIn,validateListing,wrapAsync(async (req, res, next) => {
    let listing = req.body.listing;
    let newListing = new Listing(listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}));

// edit
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested, Does not exist!");
        res.redirect("/listings");
    }
    res.render('listings/edit.ejs', { listing });
}));

// update
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

// delete
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted !");
    // console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports =router;
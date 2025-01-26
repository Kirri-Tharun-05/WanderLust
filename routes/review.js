const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js')
const ExpressError = require('../utils/ExpressError.js');
const {reviewSchema} = require('../schema.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');


const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}


// reviews
router.post("/",validateReview,wrapAsync( async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review Saved");
    req.flash("success","New Review Created!");
    // res.send("new review Saved");
    res.redirect(`/listings/${listing._id}`);
}));

// Delete review route
// remove the comman part of the path eg :/listings/:id/reviews and make changes in index.js file ny using app.use("/listings/:id/reviews",);
router.delete("/:reviewId",wrapAsync( async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    // await Listing.findById(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}))




module.exports=router;
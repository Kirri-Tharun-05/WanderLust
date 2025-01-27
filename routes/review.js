const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js')
const ExpressError = require('../utils/ExpressError.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const {validateReview,isLoggedIn, isReviewAuthor}= require("../middleware.js");
const reviewController= require("../controller/reviews.js")

// reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.creteReview));

// Delete review route
// remove the comman part of the path eg :/listings/:id/reviews and make changes in index.js file ny using app.use("/listings/:id/reviews",);
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))

module.exports=router;
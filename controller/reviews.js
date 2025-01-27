const Listing= require("../models/listing")
const Review=require("../models/review");
module.exports.creteReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    // console.log(newReview);
    console.log("new review Saved");
    req.flash("success","New Review Created!");
    // res.send("new review Saved");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    // await Listing.findById(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}
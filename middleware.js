const Listing = require("./models/listing.js");
const {listingSchema,reviewSchema} = require('./schema.js');
const ExpressError = require('./utils/ExpressError.js');

module.exports.isLoggedIn=(req,res,next)=>{
    
    if(!req.isAuthenticated())
        {
            req.session.redirectUrl=req.originalUrl;
            req.flash("error","You must be logged in to create listing!");
            return res.redirect("/login");
        }
        next();
} 

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    // console.log(listing.owner);
    // console.log(res.locals.currUser._id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You Are Not The Owner Of This Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing =(req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
};

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}

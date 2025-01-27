const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Review=require("./review.js");
const listingSchema=new Schema({
    title : {
        type :String,
        required:true,
    },
    description : String,
    image : {
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Floading&psig=AOvVaw2P8Fl3imi6lAZc99fDHpVw&ust=1733721380972000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNjLjMm1l4oDFQAAAAAdAAAAABAE",
        },
    price : Number,
    location : String,
    country: String,
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner : {
        type : Schema.Types.ObjectId,
        ref:"User"
    }
});


listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id :{$in : listing.reviews}})
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
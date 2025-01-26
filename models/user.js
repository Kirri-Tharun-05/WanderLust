const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const passportLocalMOngoose= require("passport-local-mongoose");

const userSchema= new Schema({
    email :{
        type :String,
        required: true
    }
});

userSchema.plugin(passportLocalMOngoose);
module.exports= mongoose.model("User",userSchema);
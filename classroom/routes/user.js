const express=require("express");
const route=express.Router();
// for User
route.get('/',(req,res)=>{
    res.send("Hi this is root page !");
})

// index
route.get('/home',(req,res)=>{
    res.send("Get For users");
})
// show
route.get('/about',(req,res)=>{
    res.send("Get for user id");
})
// post
route.post('/home',(req,res)=>{
    res.send("Post for users");
})
// delete
route.delete('/home/:id',(req,res)=>{
    res.send("Delete from user id");
})

module.exports= route;


const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require("../models/listing.js");
const mongo_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{console.log("Connected Sucessfully")}).catch((err)=>{console.log(err)});

async function main() {
  await mongoose.connect(mongo_URL);
}

const initDB=async ()=>{
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj, owner : "6795e634af8ab2a956dc91f2"}));
  await Listing.insertMany(initData.data);
}

initDB();
const mongoose=require("mongoose")
require("dotenv").config();
exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedToplogy:true})
    .then(console.log("connection succesful"))
    .catch((error)=>{
        console.log("DB Connection Issue");
        console.error(error)
        process.exit(1)
    })
    //application connected to db using moongosse
}
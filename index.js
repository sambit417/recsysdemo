//app create 
const express=requires("express");
const app=express();

//db connection
const db=require("./config/database")
db.connect();
//cloud connect
const cloudinary=require("./config/cloudinary")
cloudinary.cloudinaryConnect()
//mount api route
const Upload=require("./routes/FileUpload");
app.use('/api/v1/upload',Upload)
// find port4
require("dotenv").config();
const PORT=process.env.PORT||3000;
//add middleware
//express js can intearct with json but can not interact with file so we have to use thirdparty
app.use(express.json())
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
//activate server

app.listen(PORT,()=>{
    console.log('App is running at ${PORT}');
})
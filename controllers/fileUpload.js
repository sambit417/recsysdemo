//need for import
//write handler function
const { response } = require("express");
const File=require("../models/File");
const cloudinary=require("cloudinary").v2
//localfile->handlerfunction
exports.localFileUpload=async(req,res)=>{
    try{
        const file=req.files.file;
        console.log("File ",file);
        //__dirname ->__ indicates current directory 
        let path = `${__dirname}/files${Date.now()}.${file.name.split('.').pop()}`;
        file.mv(path,(err)=>{
            console.log(err);
        });
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'local file uploaded Successfully',
        })
    }
    catch(error){
         console.log(error);
    }
}
function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file,folder){
    const options={folder};
    return await cloudinary.uploader.upload(file.tempFilepath);
}
exports.imageUpload=async(req,res)=>{
    try{
        const{name,tags,email}=req.body;
        console.log(name,tags,email);
        const file=req.files.imageFile;
        console.log(file);
        const supportedTypes=["pdf"];
        const fileType=file.name.split('.')[1].toLowerCase();
        //validation
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                succes:false,
                message:'file format not supported',
            })
        }
        //if supported
        const response= await uploadFileToCloudinary(file,"Codehelp");
        // add entry in db
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            succes:true,
            message:"image succesfully uploade",
        })


    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong',
        })
    }
}
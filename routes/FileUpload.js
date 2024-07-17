const express=require("express")
const router=express.Router();
const{pdfupload,imageUpload}=require("../controllers/fileUpload");
//api route
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
module.exports=router;
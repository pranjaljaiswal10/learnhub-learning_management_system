import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCoudinary = async (localFilePath) => {
  try {
    if(!localFilePath){
      return null;
    }
    const response=await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
    })
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
   fs.unlinkSync(localFilePath)
   console.log(error)
  }
};

const deleteFromCloudinary=async (public_id) => {
    try {
    await cloudinary.uploader.destroy(public_id)    
    } catch (error) {
    console.log(error)
    }
}

const deleteVideoFromCloudinary=async (public_id) => {
  try {
   await cloudinary.uploader.destroy(public_id,{resource_type:"video"}) 
  } catch (error) {
   console.log(error)    
  }
}



export {uploadOnCoudinary,deleteFromCloudinary,deleteVideoFromCloudinary}

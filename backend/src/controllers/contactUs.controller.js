import ContactUs from "../models/contactUs.model";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const registerRequest=asyncHandler(async(req,res)=>{
    const user=req.user._id
    if(!user){
        throw new ApiError(404,"Unotherised request")
    }
    
    const {message}=req.body
    if(message.trim()===""){
        throw new ApiError(400,"please provide some message")
    }

    const attachments=[];
    
    req.files?.attachments.foreach(async(ele)=>{
        const localPath=ele.path
        if(!localPath){
            throw new ApiError(400,"localpath not found")
        }
        const resp=uploadOnCloudinary(localPath)
        attachments.push(resp.url)
    })
        
    const registered=await ContactUs.create({
        user,
        message,
        attachments
    })
    if(!registered){
        throw new ApiError(402,"sopmething went wrong while registeration")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Your message is rreceived successfully")
    )
})

export {
    registerRequest
}
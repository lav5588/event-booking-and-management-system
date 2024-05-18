import ContactUs from "../models/contactUs.model.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const registerRequest=asyncHandler(async(req,res)=>{
    
    const {name,email,message}=req.body
    if(name.trim()===""){
        throw new ApiError(400,"please provide your name")
    }
    if(message.trim()===""){
        throw new ApiError(400,"please provide some message")
    }
    if(email.trim()===""){
        throw new ApiError(400,"please provide Your email address");
    }
        
    const registered=await ContactUs.create({
        name,
        email,
        message,
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
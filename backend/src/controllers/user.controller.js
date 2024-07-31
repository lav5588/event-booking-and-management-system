import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import  Jwt  from "jsonwebtoken"
import nodemailer from "nodemailer"
import mongoose from "mongoose"
import chalk from "chalk"

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        
        const refreshToken =user.generateRefreshToken()
        
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        
        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser=asyncHandler(async(req,res)=>{
    try {
        const {fullName,email,password}=req.body
        if(
            [fullName,email,password].some((field)=>field?.trim()==="")
        ){
            throw new ApiError(400,"All fields are required")
        }
        const existedUser=await User.findOne({email})
        if(existedUser){
            throw new ApiError(409,"user with this email already exist")
        }
        const user=User.create({
            fullName,
            email,
            password
        })
        const createdUser=User.findById(user._id).select("-password -refreshToken")
        if(!createdUser){
            throw new ApiError(500,"Something went wrong while registering the user")
        }
        return res.status(201).json(
            new ApiResponse(200,"User Registered successfully")
        )
    } catch (error) {
        console.log("Something went wrong while registering the user");
        console.log(error);
    }
})


const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email){
        throw new ApiError(400,"email is required")
    }
    const user=await User.findOne({email})
    if(!user)   {
        throw new ApiError(404,"user does'nt exist")
    }
    const isPasswordCorrect=await user.isPasswordCorrect(password)
    
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid User Credential")
    }
    
    const {accessToken,refreshToken}=await generateAccessAndRefereshTokens(user._id)
    const loggedinUser=await User.findById(user._id).select("-password -refreshToken")
    const options={
        path : '/',
        httpOnly:true,
        secure:true,
        sameSite:'None',
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedinUser,
                accessToken,
                refreshToken
            },
            "User Logged In Successfully"
        )
    )
})


const logOutUser=asyncHandler(async(req,res)=>{
    
    console.log("userId:",req.user._id);
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true,
        sameSite:'None',
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User Logged Out"))
})


const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=await req.cookies?.refreshToken || req.body.refreshToken

    
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unotherized Request")
    }
    try {
        const decodedToken=Jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        
        const user=await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401,"Invalid Refresh Token")
        }
        if(incomingRefreshToken!==user.refreshToken){
            throw new ApiError(401,"Refresh Token is expired or used")
        }
        const options={
            httpOnly:true,
            secure:true
        }
        const {accessToken,refreshToken}=await generateAccessAndRefereshTokens(user._id)
        
        
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken
                },
                "accessTokenRefreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.messege || "Invalid RefreshToken")
    }
})


const changeCurrentPassword=asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body
    const user=await User.findById(req.user?._id)
    console.log(user);
    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
    console.log(isPasswordCorrect); 
    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid Old Password")
    }
    user.password=newPassword
    await user.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(

        new ApiResponse(
            200,
            {},
            "Password Changed Successfully"
        )
    )
})


const getcurrentUser=asyncHandler(async(req,res)=>{

    const bookedEvents=await User.aggregate(
        [
            {
            $match: {
              _id: new mongoose.Types.ObjectId(req.user._id)
            }
          },
          {
            $lookup: {
              from: "bookings",
              localField: "_id",
              foreignField: "user",
              as: "bookings"
            }
          },
          {
            $unwind: "$bookings"
          },
          {
            $lookup: {
              from: "events",
              localField: "bookings.event",
              foreignField: "_id",
              as: "bookedEvents"
            }
          },
          {
            $group: {
               _id: "$_id",
              
              bookedEvents:{$push:"$bookedEvents"}
            }
          },
          
        ]
    )
    
    const user={...req.user._doc,"bookedEvents":bookedEvents[0]?.bookedEvents || null}
  

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "User Fetched Successfully"
        )
    )
})

const updateAccountDetails=asyncHandler(async(req,res)=>{
    const {fullName,email}=req.body
    if(!fullName || !email){
        throw new ApiError(400,"All fields are required")
    }
    const user=await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullName,
                email
            }
        },
        {
            new :true
        }
    ).select("-password -refreshToken")
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Account Details updated Successfully"
        )
    )
})

const knowUserBetterSignUp=asyncHandler(async(req,res)=>{
    const {
        gender,
        relationshipStatus,
        haveKids,
        ratingOfCurrentHealth,
        haveAnyDisability,
        location,
    }=req.body

    let {dob,hobbies}=req.body
    dob=typeof(dob)==Date?dob:new Date(dob)
    // hobbies=hobbies.split(" ")

    const user=await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                dob,
                gender,
                relationshipStatus,
                haveKids,
                ratingOfCurrentHealth,
                haveAnyDisability,
                hobbies,
                location,
            }
            
        },
        {
            new:true
        }
    ).select("-password -refreshToken")
    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"fields are setted succesffully!💖")
    )

})

const verifyEmail =asyncHandler(async(req,res)=>{
        try {
            const{name, email} = req.body
            const user=await User.findOneAndUpdate({email: email});
            console.log(chalk.green("User: "),user)
            if(user){
                return res.status(400).json(
                    new ApiResponse(400,"User with this email already exists.")
                );
            }
            let Otp=0;
            for(let i=0; i<6; i++){
                Otp=Otp*10+Math.floor(Math.random()*10);
                // console.log("OTP:",Otp);
            }
            const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_ID, 
                    pass: process.env.EMAIL_APP_PASSWORD, 
                },
            });
            const messege = {
                from:{
                    name:"EVENTCRAFTER",
                },
                to: email,
                subject: "Eventcrafter OTP",
                html:`<h1>Hello ${name}!</h1><p>Your EventCrafter OTP is<b> ${Otp}</b>. Please Don't share with others.Thanks You❤️❤️❤️❤️❤️.<p>`,
                // text: ``
            }
            await transporter.sendMail(messege);
            console.log("Otp sent to mail");
            return res.status(200).json(new ApiResponse(200,"OK",{Otp}));
    
        } catch (error) {
            console.log(error);
            return res.status(500).json(new  ApiResponse("500",{},"Something went wrong while trying to send otp message."));
        }
});

export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getcurrentUser,
    updateAccountDetails,
    knowUserBetterSignUp,
    verifyEmail
}
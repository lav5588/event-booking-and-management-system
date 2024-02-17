
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import Event from "../models/event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

const registerEvent=asyncHandler(async(req,res)=>{
    let {
        inviteeViaMail,
        inviteeViaNumber,
        eventName,
        isOpen,
        isFree,
        price,
        date,
        location,
        startTime,
        endTime,
        category,
        format,
        description,
        hashTags,   
    }=req.body


    if(
      [ 
        eventName,
        isOpen,
        isFree,
        date,
        location,
        startTime,
        endTime,
        category,
        format,
        description,
       
      ].some((item)=>item.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    if(isFree==="Priced" && price==""){
            throw new ApiError(400,"Priced event should not be without a price");
    }
    if(isFree==="Free"){
            price = 0;
    }
    
   
   
    
    console.log("files",req.files);
    const uploadedFileUris=[];
    for(const file of req.files || []){
        const cloudinaryResponse=await uploadOnCloudinary(file.path)
        console.log("cloudinary response: ",cloudinaryResponse.url);
        uploadedFileUris.push(cloudinaryResponse.url); 
    }
   
  
    
        // console.log({
        //     inviteeViaMail,
        //     inviteeViaNumber,
        //     eventName,
        //     isOpen,
        //     isFree,
        //     price,
        //     date,
        //     location,
        //     startTime,
        //     endTime,
        //     category,
        //     format,
        //     description,
        //     hashTags,
        // });

    const event= await Event.create({
        createdBy:req.user._id,
        eventName,
        isOpenForAll:isOpen,
        location,
        eventDate:date,
        startTime,
        endTime,
        category,
        eventFormat:format,
        eventDescription:description,
        eventHashtags:hashTags,
        invitees:{
            viaMail:inviteeViaMail,
            viaNumber:inviteeViaNumber
        },
        price,
        files:uploadedFileUris,
    })

    const createdEvent=Event.findById(event._id)
    if(!createdEvent){
        throw new ApiError(500,"something went wrong while registering event")
    }
    res
    .status(201)
    .json( new ApiResponse(200,"Event Registered Successfully"))
})


 


const getEvent=asyncHandler(async(req,res)=>{

  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if(token){
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    if(user){
      const events=await Event.aggregate([
        {
          $lookup: {
            from: "favoriteevents",
            let: { eventId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$event", "$$eventId"] },
                      { $eq: ["$user", user._id] }
                    ]
                  }
                }
              },
              { $count: "isLike" }
            ],
            as: "favoriteEventDetails"
          }
        },
        {
          $addFields: {
            isLike: {
              $cond: {
                if: { $gt: [{ $size: "$favoriteEventDetails" }, 0] },
                then: true,
                else: false
              }
            }
          }
        },
        {
          $unset: "favoriteEventDetails"
        },
        {
          $sort: { "createdAt": -1 }
        }
      ])
      return res
      .status(200)
      .json(new ApiResponse(200,events,"Event fetched successfully"))
    }
  }

    const events=await Event.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "creatorDetails"
          }
        },
        {
          $addFields: {
            creatorName: {$first:"$creatorDetails.fullName"},
            creatorEmail:{$first:"$creatorDetails.email"}
          }
        },
        {
          $project: {
            creatorDetails:0,
            invitees:0,
            isPublished:0,
            __v:0,
            createdBy:0,
            checklist:0
          }
        }
      ]
      )



    
    
    res
    .status(200)
    .json( new ApiResponse(200,events,"Events fetched successfully"))

})



const getEventById = asyncHandler(async(req,res)=>{
  const {eventid}=req.params;
  

  const event=await Event.findById(eventid);
  if(!event){
    throw new ApiError(404,"Event not found")
  }
  res
  .status(200)
  .json( new ApiResponse(200,event,"event fetched successfully"))
})

export {
    registerEvent,
    getEvent,
    getEventById

}
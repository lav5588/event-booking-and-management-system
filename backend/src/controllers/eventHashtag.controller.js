import EventHashTag from "../models/eventHashTags.model.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import Event from "../models/event.model.js"

const addEventHashTag=asyncHandler(async(req,res)=>{
   const {hashTag,eventId}=req.body
   if(!hashTag.trim() || !eventId){
    throw new ApiError(400,"hashTag and eventid is required")
   }
   const event=await Event.findById(eventId);
   if(req.user!=event.createdBy){
    throw new ApiError(401,"only creator can add the hashtag to the event");
   }
   if(!event){
    throw new ApiError(404,"event not found")
   }
   const createdHashTag=await EventHashTag.create({
        hashTag,
        event:eventId
   })
   if(!createdHashTag){
    throw new ApiError(402,"something went wrong while adding hashtag")
   }
   return res
   .status(200)
   .json(
    new ApiResponse(200,"hashTag added successfully")
   )
})




const removeEventHashTag=asyncHandler(async(req,res)=>{
   const {eventHashTagId}=req.body
   if(!eventHashTagId){
    throw new ApiError(400,"please provide eventHashTagId");
   }
   const eventHashTag=await EventHashTag.aggregate([
    {
        $match:{
            _id:eventHashTagId
        }
    },
    {
        $lookup:{
            from:"events",
            localField:"event",
            foreignField:"_id",
            as:"event",
            pipeline:[
                {
                    $project:{
                        createdBy:1
                    }
                }
            ]
        }
    }
   ])
   if( eventHashTag.length === 0 || !eventHashTag){
    throw new ApiError(400,"something went wrong while searching the hashtag")
   }
   if(req.user!=eventHashTag?.event?.createdBy){
    throw new ApiError(401,"only event creator can delete the eventhashTag");
   }
   const deletedHashTag=await EventHashTag.findByIdAndDelete(eventHashTagId);
   if(!deletedHashTag){
    throw new ApiError(401,"something went wrong while deleting the hashTag");
   }
   return res
   .status(200)
   .deletedHashTag
   .json(
    new ApiResponse(202,"hashTag has been deleted successfully")
   )
})

export {
    addEventHashTag,
    removeEventHashTag
}
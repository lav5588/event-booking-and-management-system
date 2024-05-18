import mongoose from "mongoose";
import Booking from "../models/bookings.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js"

const addTicket=asyncHandler(
    async(req,res)=>{
        try{
            const user=req.user._id;
            const event=req.body.eventId;
            if(!event) {
                return res.status(400).json(
                    new ApiResponse(400,{},"please provide an  event")
                )
            }
            const booking=await Booking.create({user,event})
            if(!booking) {
                return res.status(400).json(
                    new ApiResponse(400,{},"somethinig went wrong while booking the event")
                )
            }
            return res.status(201).json(
                new ApiResponse(201,booking,"event booked successfully")
            )
        }
    catch (error) {
        console.log(error);
        return res.status(400).json(new ApiResponse(400,error,"somethinig went wrong while booking the event"));
    }
}
)

const deleteTicket=asyncHandler(async(req,res)=>{
    try {
        const eventId =new mongoose.Types.ObjectId(req.body.eventId);
        const user=req.user._id;
        await Booking.findOneAndDelete({user,event: eventId});
        res.json({
            message: "event deleted successfully",
            status: 200,
            success: true,
            error: false,
        });
    } catch (error) {
        console.log(error);
    }
})

const showBookedTicket=asyncHandler(async(req,res)=>{
    try {
        const user=req.user._id;
        const bookings=await Booking.aggregate([
            {
              $match: { user }
            },
            {
              $lookup: {
                from: 'events', 
                localField: 'event', 
                foreignField: '_id', 
                as: 'event' 
              }
            },
            {
              $unwind: '$event' 
            },
          ]);
        //   console.log(bookings)
          return res.status(200).json(
            new ApiResponse(200,bookings,"your booked events")
          )
    } catch (error) {
        console.log(error)
    }
})
export {
    addTicket,
    deleteTicket,
    showBookedTicket
}
import ViewedEvent from '../models/viewedEvents.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import Event from "../models/event.model.js"
// Add Viewed Event Controller
const addViewedEvent = asyncHandler(
    async (req, res) => {
        try {
          const { eventId } = req.body;
          const { userId } = req.user._id; 
      
          if (!eventId) {
            throw new ApiError(400, 'Please provide an eventId');
          }
      
          
          const eventExists = await Event.exists({ _id: eventId });
          if (!eventExists) {
            throw new ApiError(404, 'Event not found');
          }
      
         
          const existingViewedEvent = await ViewedEvent.findOne({ event: eventId, user: userId });
      
          if (existingViewedEvent) {
            throw new ApiError(400,"this event is already present in viewed history");
          }
      
          const viewedEvent = await ViewedEvent.create({ event: eventId, user: userId });
      
          return res
          .status(201)
          .json(new ApiResponse(201, 'ViewedEvent added successfully', viewedEvent));
        } catch (error) {
          
          console.log(error);
          throw new ApiError(400,"catch block addViewedEvent executed")
        }
      }
)

// Delete Viewed Event Controller
const deleteViewedEvent = asyncHandler(
    async (req, res) => {
        try {
          const { eventId } = req.params;
          const { userId } = req.user._id;
      
          const eventExists = await Event.findById({ _id: eventId });
          if (!eventExists) {
            throw new ApiError(404, 'Event not found');
          }
      
          
          const viewedEvent = await ViewedEvent.findOne({ event: eventId, user: userId });
      
          if (!viewedEvent) {
            throw new ApiError(404, 'ViewedEvent not found');
          }
      
          
          await ViewedEvent.findByIdAndDelete(viewedEvent._id)
      
          res.
          status(200).
          json(new ApiResponse(200, 'ViewedEvent deleted successfully'));
        } catch (error) {
          // Handle errors
          console.log(error);
          throw new ApiError(500,"catch block of deleteViewedEvent executed")
        }
      }
)

export {
    addViewedEvent,
    deleteViewedEvent
}
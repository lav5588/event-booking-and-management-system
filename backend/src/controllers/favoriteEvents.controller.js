import FavoriteEvent from '../models/favoriteEvents.model.js';
import Event from '../models/event.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';

// Controller to add an event to favorites
const addAndRemoveFavorite = async (req, res) => {
  try {
    const eventId  = req.body.eventId;
    const userId = req.user._id; 

    
    if (!eventId) {
      throw new ApiError(400, 'Please provide an eventId');
    }

    
    const event = await Event.findById(eventId);
    if (!event) {
      throw new ApiError(404, 'Event not found');
    }

    
    const existingFavorite = await FavoriteEvent.findOne({
        event: eventId,
        user: userId
    });
    if (existingFavorite) {
      await FavoriteEvent.findByIdAndDelete(existingFavorite._id);
      res.status(201).json(new ApiResponse(201,{}, 'Event removed from favorites successfully'));
      return;
    }

  
    const createdFavorite = await  FavoriteEvent.create(
        {
             event: eventId,
              user: userId 
        }
            );
    if(!createdFavorite){
        throw new ApiError(400,'something went wrong while creating the favorites')
    }

    res.status(201).json(new ApiResponse(201, 'Event added to favorites successfully'));
  } catch (error) {
    
    return res
    .status(error.statusCode || 500)
    .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};



export { 
  addAndRemoveFavorite,
 
};

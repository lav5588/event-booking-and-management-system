import asyncHandler from '../utils/asyncHandler.js';
import Likedhashtag from '../models/likedHashtags.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from "../utils/ApiResponse.js"

const likeHashTag = asyncHandler(async (req, res) => {
  const { hashTag } = req.body;

 
  if (!hashTag.trim()){
    throw new ApiError(400, 'Please provide a hashTag');
  }

 
  const existingLike = await Likedhashtag.findOne({ hashTag, user: req.user._id });
  if (existingLike) {
    throw new ApiError(400, 'You have already liked this hashTag');
  }

 
  const newLike = await Likedhashtag.create({ hashTag, user: req.user._id });
  if(!newLike){
    throw new ApiError(402,"Something went wrong while liking hashtag")
  }
  return res
  .status(201)
  .json(
   new ApiResponse(201,"hashTag liked successfully")
  );
});

const unlikeHashTag = asyncHandler(async (req, res) => {
    const { hashTag } = req.body;
  
    // Check if the hashTag is provided
    if (!hashTag) {
      throw new ApiError(400, 'Please provide a hashTag');
    }
  
    // Check if the user has liked the hashTag
    const existingLike = await Likedhashtag.findOneAndDelete({ hashTag, user: req.user._id });
    if (!existingLike) {
      throw new ApiError(400, 'You have not liked this hashTag');
    }
  
    return res
    .status(200)
    .json(
        new ApiResponse(200,"hashTag unliked successfully")
    );
  });

export {
    likeHashTag,
    unlikeHashTag
} ;

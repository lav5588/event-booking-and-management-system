import ViewedProfile from '../models/viewedProfile.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from "../utils/asyncHandler.js"
import User from '../models/user.model.js'



// Controller to add a viewed profile
const addViewedProfile = asyncHandler(
    async (req, res) => {
        try {
          const { profileId } = req.body;
      
          
          if (!profileId) {
            throw new ApiError(400, 'Please provide a profileId');
          }
      
          
          const isProfileExist = await User.findById(profileId);
          if (!isProfileExist) {
            throw new ApiError(404, 'Profile not found');
          }
      
          
          if (req.user._id === profileId) {
            throw new ApiError(400, 'You cannot view your own profile');
          }
      
         
          const existingViewedProfile = await ViewedProfile.findOne({
            user: req.user.id,
            profile: profileId,
          });
      
          if (existingViewedProfile) {
            return res
            .status(200)
            .json(new ApiResponse(200, 'Profile already viewed'));
          }
      
        
          const newViewedProfile = await ViewedProfile.create({
            profile: profileId,
            user: req.user.id,
          });
          
          if(!newViewedProfile){
            throw new ApiError(400,"something went wrong while creating viewedProfile")
          }
      
          res
          .status(201)
          .json(new ApiResponse(201, 'Profile viewed successfully'));
        } catch (error) {
            console.log(error);
            throw new ApiError(400,"catch block of addviewedEvent execited")
        }
      }
)

// Controller to delete a viewed profile
const deleteViewedProfile = asyncHandler(
    async (req, res) => {
        try {
          const { profileId } = req.params;
      
          if (!profileId) {
            throw new ApiError(400, 'Please provide a profileId');
          }
      
          // Check if the viewed profile entry exists
          const viewedProfile = await ViewedProfile.findOneAndDelete({
            user: req.user.id,
            profile: profileId,
          });
      
          if (!viewedProfile) {
            throw new ApiError(404,"viewedProfile does not exist of this profile and userId")
          }
      
          return res
          .status(200)
          .json(new ApiResponse(200, 'Profile removed from viewed profiles'));
        } catch (error) {
            console.log(error);
            throw new ApiError(404,"catch block of deleteviewedEvent controller executed");
        }
      }
      
)
export {
    addViewedProfile,
    deleteViewedProfile
};

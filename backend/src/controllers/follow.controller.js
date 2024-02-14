import Follow from '../models/follow.model.js'; 
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// Follow Controller
const followUser = async (req, res) => {
    const { followedTo } = req.body;
    const followedBy = req.user._id; 

    try {
        if(!followedTo){
            throw new ApiError(400,"please provide the id of followed to")
        }
        if (followedTo.toString() === followedBy.toString()) {
            throw new ApiError(400, "You cannot follow yourself");
        }

         
        const existingFollow = await Follow.findOne({ 
            followedBy,
             followedTo 
        });
        if (existingFollow) {
            throw new ApiError(400, "You are already following this user");
        }

        
        const newFollow = await Follow.create({ 
            followedBy,
            followedTo
        });

        if(!newFollow){
            throw new ApiError(401,"something went wrong while creating new follow")
        }

        return res
        .status(201)
        .newFollow
        .json(new ApiResponse(201, "You are now following this user"));
    } catch (error) {
        res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
};

// Unfollow Controller
const unfollowUser = async (req, res) => {
    const { followedTo } = req.body;
    const followedBy = req.user._id; 

    try {
        if(!followedTo){
            throw new ApiError(400,"please provide the id of followed to")
        }
        
        const existingFollow = await Follow.findOne({ followedBy, followedTo });
        if (!existingFollow) {
            throw new ApiError(400, "You are not following this user");
        }

        // Remove the follow relationship
        await Follow.findByIdAndDelete(existingFollow._id);

       return res
        .status(200)
        .json(new ApiResponse(200, "You have unfollowed this user"));
    } catch (error) {
        res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
};

export { 
    followUser,
    unfollowUser
 };

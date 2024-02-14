import LikedCategory from '../models/likedCategories.model.js'; // Adjust the path based on your project structure
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// Controller to like a category
const likeCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const userId= req.user._id; 

        if (!category.trim()) {
            throw new ApiError(400, 'Please provide a category');
        }

        const existingLike = await LikedCategory.findOne({
            category,
            user: userId
        });

        if (existingLike) {
            throw new ApiError(400, 'You have already liked this category');
        }

        const newLike = await LikedCategory.create({ category, user: userId });
        if(!newLike){
            throw new ApiError(401,"something went wrong while create likedcategory")
        }

        return res
        .status(201)
        .json(new ApiResponse(201, 'Category liked successfully', newLike));
    } catch (error) {
        console.log(error)
        throw new ApiError(500,"error in likedCategory controller .Catch part is executed")
    }
};

// Controller to unlike a category
const unlikeCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const userId= req.user._id;

        if (!category) {
            throw new ApiError(400, 'Please provide a category');
        }

        const deletedLike = await LikedCategory.findOneAndDelete({ category, user: userId });

        if (!deletedLike) {
            throw new ApiError(404, 'You have not liked this category');
        }

        return res
        .status(200)
        .json(new ApiResponse(200, 'Category unliked successfully', deletedLike));
    } catch (error) {
        console.error(error);
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(error.apiResponse());
        } else {
            res.status(500).json(new ApiResponse(500, 'Internal Server Error'));
        }
    }
};

export { likeCategory, unlikeCategory };

import Search from '../models/search.model.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import {asyncHandler} from '../utils/asyncHandler.js'


// Controller to add a search entry
const addSearch = asyncHandler(
    async (req, res) => {
        try {
            const { search } = req.body;
            const userId = req.user._id; 
    
            
            if (!search.trim()) {
                throw new ApiError(400, "Please provide a search query");
            }
    
            const newSearch = await Search.create({ search, user: userId });
            if(!newSearch){
                throw new ApiError(401,"something went wrong while adding search");
            }
            return res
            .status(201)
            .json(new ApiResponse(201, "Search entry added successfully", newSearch));
        } catch (error) {
            console.log(error);
            throw new ApiError(402,"catch block of addSearch controller executed")
        }
    }
    
)


// Controller to delete a search entry
const deleteSearch =asyncHandler(
    async (req, res) => {
        try {
            const { searchId } = req.params;
    
            
            if (!searchId) {
                throw new ApiError(400, "Please provide a search ID");
            }
    
            
            const searchEntry = await Search.findById(searchId);
            if (!searchEntry) {
                throw new ApiError(404, "Search entry not found");
            }
    
            
            if (req.user._id.toString() !== searchEntry.user.toString()) {
                throw new ApiError(403, "You are not authorized to delete this search entry");
            }
    
           
            await Search.findByIdAndDelete(searchId);
    
           return  res
           .status(200)
           .json(new ApiResponse(200, "Search entry deleted successfully"));
        } catch (error) {
            console.log(error);
            throw new ApiError(402,"catch block of removeSearch controller executed")
        }
    }
    
) 



export { 
    addSearch,
    deleteSearch
};

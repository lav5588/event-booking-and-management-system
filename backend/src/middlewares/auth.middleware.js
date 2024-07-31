import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import chalk from "chalk";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            
            res.status(401).json(
                new ApiResponse(401, "Unauthorized request")
            )
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
        
        req.user = user;
        next()
    } catch (error) {
        // console.log("Err: ",chalk.red(error));
        res.status(401).json(
            new ApiResponse(401,{}, error?.message || "Invalid access token")
        )
        
    }
    
})

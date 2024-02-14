import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Blog from "../models/blogs.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBlog=asyncHandler(async(req,res)=>{
    try {
        const {title,content}=req.body
    
        if(title?.trim()===""){
            throw new ApiError(406,"please provide title of the blog")
        }
    
        if(content?.trim()===""){
            throw new ApiError(406,"please provide content of the blog")
        }
       
        
        const blog=Blog.create({
            createdBy:req.user._id,
            title,
            content
        })
        const createdBlog=Blog.findById(blog._id);
        if(!createdBlog){
            throw new ApiError(400,"Something Went Wrong While Creating Blog")
        }
        
        return res
        .status(200)
        .json(
            new ApiResponse(201,"blogs created successfully")
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(400,"catch block of create-blog controller executed")
    }
})


const updateBlog=asyncHandler(async(req,res)=>{
    try {
        const blogIdToUpdate=req.body.id
        
        if(!blogIdToUpdate){
            throw new ApiError(401,"please provide blog id which you want to update");
        }
        const{title,content}=req.body
        
        if(!title.trim() || !content.trim()){
            throw new ApiError(401,"content and title both are required")
        }
        const blog=await Blog.findById(blogIdToUpdate)
    
        
        if(!blog){
            throw new ApiError(402,"blog not found")
        }
        else if(blog.createdBy.toString()!==req.user._id.toString()){
            throw new ApiError(404,"You can not update the blog")
        }
        const updatedBlog=await Blog.findByIdAndUpdate(blogIdToUpdate,{
            $set:{
                title:title,
                content:content
            }
        },
        {
            new:true
        })
    
        if(!updatedBlog){
            throw new ApiError(500,"something went wrong while updating the blog")
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(200,"your blog is updated successfully")
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"catch block of update-blog executed")
    }
})

const deleteBlog=asyncHandler(async(req,res)=>{
    try {
        const blogIdToDelete=req.body.id
        if(!blogIdToDelete){
            throw new ApiError(400,"please provide the blog id which you want to delete");
        }
        const blog=await Blog.findById(blogIdToDelete);
        if(!blog){
            throw new ApiError(402,"blog not found")
        }
        else if(blog.createdBy.toString()!==req.user._id.toString()){
            throw new ApiError(401,"Blog can only be deleted by the creator");
        }
        
        await Blog.findByIdAndDelete(blogIdToDelete);
        return res
        .status(200)
        .json(
            new ApiResponse(200,"Blog is deleted successfully")
        )
    } catch (error) {
        console.log(error)
        throw new ApiError(500,"catch block of deleteBlog executed")
    }
})

export {
    createBlog,
    updateBlog,
    deleteBlog
}
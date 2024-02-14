import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError }  from "../utils/ApiError.js"
import Cart from "../models/cart.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const addToCart=asyncHandler(async(req,res)=>{
    const event=req.body.id
    const user=req.user._id
    if(!event && !user){
        throw new ApiError(404,"Please provid user and event both");
    }
    const cart=await Cart.create({
        event,
        user
    })

    return res
    .status(200)
    .json(
        200,"Item is added to cart successfully"
    )
})




const removeFromCart=asyncHandler(async(req,res)=>{
    const cartIdToDelete=req.body.id
    if(!cartIdToDelete){
        throw new ApiError("401","please provide carrt id")
    }
    const cart=await Cart.findById(cartIdToDelete)
    if(!cart){
        throw new ApiError(404,"this item is not in your cart")
    }
    else if(cart.user!==req.user._id){
        throw new ApiError(400,"You can't remove this cart")
    }
    await Cart.findByIdAndDelete(cartIdToDelete)
    return res
    .status(200)
    .json(
        new ApiResponse(200,"Item is successfully removed from cart")
    )
})


export {
    addToCart,
    removeFromCart
}
import { Schema,model } from "mongoose";

const likedCategorySchema=Schema({
    catogory:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

})

const LikedCategory=model("LikedCategory",likedCategorySchema)
export default LikedCategory
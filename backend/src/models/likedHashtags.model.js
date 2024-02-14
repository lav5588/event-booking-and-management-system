import { Schema,model } from "mongoose";

const likedHashTagSchema=new Schema({
    hashTag:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})

const Likedhashtag=model("Likedhashtag",likedHashTagSchema)
export default Likedhashtag
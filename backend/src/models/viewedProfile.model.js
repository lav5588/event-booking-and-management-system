import { Schema,model } from "mongoose";
const viewedProfileSchema=new Schema({
    profile:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})

const ViewedProfile=model("ViewedProfile",viewedProfileSchema)
export default ViewedProfile
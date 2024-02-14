import { Schema,model } from "mongoose";

const followSchema=Schema({
    followedBy:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    followedTo:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})

const Follow=model("Follow",followSchema)

export default Follow
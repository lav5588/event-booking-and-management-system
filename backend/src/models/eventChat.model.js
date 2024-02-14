import { Schema, model } from "mongoose";

const chatSchema=new Schema({
    event:{
        type:Schema.Types.ObjectId,
        ref:"events",
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const EventChat=model("EventChat",chatSchema)
export default EventChat
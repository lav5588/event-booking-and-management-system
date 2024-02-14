import { Schema,model } from "mongoose";

const eventHashTagSchema=new Schema({
    hashTag:{
        type:String,
        required:true
    },
    event:{
        type:Schema.Types.ObjectId,
        ref:"events"
    }
},{timestamps:true})


const EventHashTag=model("EventHashTag",eventHashTagSchema)
export default EventHashTag
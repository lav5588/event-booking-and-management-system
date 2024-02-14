import { Schema,model } from "mongoose";


const viewedEventSchema=new Schema({
    event:{
        type:Schema.Types.ObjectId,
        ref:"events"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})

const ViewedEvent=model("ViewedEvent",viewedEventSchema)
export default ViewedEvent
import { Schema,model } from "mongoose";

const giftSchema=Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    event:{
        type:Schema.Types.ObjectId,
        ref:"events",
        required:true 
    },
    noOfVipTicket:{
        type:Number,
        required:true
    },
    noOfRegularTicket:{
        type:Number,
        required:truew
    }
},{timestamps:true})

const Gift=model("Gift",giftSchema)
export default Gift
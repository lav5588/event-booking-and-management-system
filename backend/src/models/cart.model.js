import {Schema,model} from "mongoose";

const cartSchema=new Schema({
    event:{
        type:Schema.Types.ObjectId,
        ref:"events",
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{timestamps:true})

const Cart=model("Cart",cartSchema)

export default Cart
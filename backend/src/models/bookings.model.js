import { Schema,model } from "mongoose";

const bookingSchema=Schema({
    event: {
        type: Schema.Types.ObjectId, 
        ref: 'events',
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})

const Booking=model("Booking",bookingSchema)
export default Booking
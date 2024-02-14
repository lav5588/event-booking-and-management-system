import {Schema,model} from "mongoose";

const favoriteEventSchema=new Schema({
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

const FavoriteEvent=model("FavoriteEvent",favoriteEventSchema)

export default FavoriteEvent
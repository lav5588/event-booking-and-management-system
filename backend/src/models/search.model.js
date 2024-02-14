import { Schema,model } from "mongoose";

const searchSchema=new Schema({
    search:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{timestamps:true})

const Search=model("Search",searchSchema)
export default Search
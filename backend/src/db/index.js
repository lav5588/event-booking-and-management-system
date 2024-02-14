import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const dbConnect=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log(`\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongodb Connection Failed 😒: Error: ",error);
        process.exit(1);
    }
}

export default dbConnect;
import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();


const connectDB = async() => {
    try{ 
       await mongoose.connect(process.env.MONGODB_URI);  
       console.log('MongoDB connection SUCCESS');
    }
    catch(err){
        console.error('MongoDB connection FAILED');
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;
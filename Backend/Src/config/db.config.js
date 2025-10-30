import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // console.log("Connecting to:", `${process.env.MONGODB_URI}/${DB_NAME}`);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB CONNECTION ESTABLISHED! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(" MONGODB connection error:", error);
        process.exit(1);
    }
};
export default connectDB;

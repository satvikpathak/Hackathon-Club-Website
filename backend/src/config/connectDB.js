import mongoose from "mongoose";

console.log("MONGO_URL:", process.env.MONGODB_URL); 
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to DB: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('Failed to connect to DB', error);
        process.exit(1);
    }
};
export default connectDB;

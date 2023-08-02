import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successful".bgYellow.black);
    } catch (error) {
        console.log(error.message.bgRed.black);
    }
}

export default connectDB;
import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async () => {
    try {
        const mongodbUrl = process.env.MONGODB_URL;

        if (!mongodbUrl) {
            throw new Error("MONGODB_URL is not defined in the environment variables.");
        }

        await mongoose.connect(mongodbUrl);
        console.log("Mongodb Connected");
    } catch (err) {
        console.error(err);
    }
};

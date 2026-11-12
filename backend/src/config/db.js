
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Check MongoDB URI
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error(
                "MONGODB_URI is missing. Check your backend/.env file."
            );
        }

        // Connect to MongoDB Atlas
        await mongoose.connect(uri);

        console.log("MongoDB Atlas Connected Successfully");

    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        throw error;
    }
};

// Export database connection function
module.exports = connectDB;


const path = require("path");

// Load environment variables first
require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");

// Initialize Express
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Check environment variables
console.log(
    "MONGODB_URI loaded:",
    Boolean(process.env.MONGODB_URI)
);

// Health check API
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "KrishiGuard AI Backend is running!",
        database: "Connected"
    });
});

// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(
                `KrishiGuard AI server running on port ${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "Server startup failed:",
            error.message
        );

        process.exit(1);
    }
};

startServer();

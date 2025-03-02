import express from "express";
import cors from "cors";
import { checksData } from "./dummyData.js";

const app = express();
const PORT = process.env.PORT || 9800; // Use environment variable for flexibility

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins (Adjust for production security)
app.use(express.json());

// Logging Middleware (Optional but useful for debugging)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Root Route
app.get("/", (req, res) => {
    res.send("Hello, World! Server is running.");
});

// API Route for Checks Data
app.get("/api/v1/checks", (req, res) => {
    try {
        if (!Array.isArray(checksData) || checksData.length === 0) {
            return res.json({
                status: "ok",
                message: "Checks fetched successfully, but no data available.",
                data: [],
            });
        }

        res.json({
            status: "ok",
            message: "Checks fetched successfully",
            data: checksData,
        });
    } catch (error) {
        console.error("Unexpected Error:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

// Catch-All Route for Undefined Endpoints
app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

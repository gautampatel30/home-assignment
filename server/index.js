import express from "express";
import cors from "cors"; 
import { checksData } from "./dummyData.js"; // Ensure this file exists

const PORT = 9800;
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// Logging Middleware (Optional)
app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

// Root Route
app.get("/", (req, res) => {
	res.send("Hello World");
});

// ✅ FIXED: API Route with Reliable Data
app.get("/api/v1/checks", (req, res) => {
	try {
		// ✅ Always return data instead of random failures
		if (!checksData || checksData.length === 0) {
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

// Start Server
app.listen(PORT, () => {
	console.log(`✅ Server is running on http://localhost:${PORT}`);
});

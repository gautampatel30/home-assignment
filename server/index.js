import express from "express";
import { checksData } from "./dummyData.js";

const PORT = 9800;

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/api/v1/checks", (req, res) => {
	const random = Math.random();

	if (random < 0.33) {
		return res.status(500).json({
			status: "error",
			message: "Server error occurred",
		});
	}

	if (random < 0.66) {
		return res.json({
			status: "ok",
			message: "Checks fetched successfully",
			data: [],
		});
	}

	res.json({
		status: "ok",
		message: "Checks fetched successfully",
		data: checksData,
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

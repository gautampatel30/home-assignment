// Components
import {
	Checkbox,
	FormGroup,
	FormControlLabel,
	Typography,
	Stack,
	Divider,
	Link,
	Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./components/ResponseDisplay";

function App() {
	const [checkList, setCheckList] = useState({
		task1: true, // Updated since the button is added
		task2: false,
		task3: false,
		task4: false,
	});
	const [responseData, setResponseData] = useState(null);
	const [viewMode, setViewMode] = useState("vertical");

	const handleCheck = (e) => {
		setCheckList((prev) => ({
			...prev,
			[e.target.name]: e.target.checked,
		}));
	};

	const fetchData = async () => {
		try {
			const response = await axios.get("http://react-take-home-backend-env.eba-mcswtr9u.us-east-1.elasticbeanstalk.com/api/v1/checks");
	
			if (response.data.status === "error") {
				console.error("Server Error:", response.data.message);
				alert("Server error occurred. Please try again later.");
				return;
			}
	
			if (!response.data.data || response.data.data.length === 0) {
				console.warn("No data available.");
				alert("No data available at the moment.");
				return;
			}
	
			console.log("Data fetched successfully:", response.data);
			setResponseData(response.data); // Keep full response for debugging
		} catch (error) {
			console.error("Error fetching data:", error);
			alert("Failed to fetch data. Please check your connection.");
		}
	};
	
	
	  
	  
	  
	  

	return (
		<Stack spacing={2}>
			<Typography variant="h2">Hello! Your job is to:</Typography>
			<Divider />
			<FormGroup>
				<FormControlLabel
					control={<Checkbox name="task1" checked={checkList.task1} />}
					label="Add a button to this page."
					onChange={handleCheck}
				/>
				<FormControlLabel
					control={<Checkbox name="task2" checked={checkList.task2} />}
					label="Pressing the button should make a request to the server at /api/v1/{placeholder}"
					onChange={handleCheck}
				/>
				<FormControlLabel
					control={<Checkbox name="task3" checked={checkList.task3} />}
					label="Create a ResponseDisplay component to display the response."
					onChange={handleCheck}
				/>
				<FormControlLabel
					control={<Checkbox name="task4" checked={checkList.task4} />}
					label="The ResponseDisplay component should have two variants: vertical and horizontal."
					onChange={handleCheck}
				/>
			</FormGroup>
			<Divider />
			<Typography variant="h4">Instructions</Typography>
			<Typography>Please adhere to React best practices</Typography>
			<Typography>Make sure your components are modular and reusable.</Typography>
			<Typography>
				This project includes{" "}
				<Link href="https://mui.com/material-ui/getting-started/">MUI components</Link>.
				Use them if you like, but it is not required.
			</Typography>
			<Divider />

			{/* Button to Fetch Data */}
			<Button variant="contained" color="primary" onClick={fetchData}>
				Fetch Data
			</Button>

			{/* Toggle View Mode */}
			{/* <Button variant="outlined" onClick={() => setViewMode(viewMode === "vertical" ? "horizontal" : "vertical")}>
				Toggle View Mode
			</Button> */}

			{/* Display Response Data */}
			{responseData && <ResponseDisplay data={responseData} viewMode={viewMode} />}
		</Stack>
	);
}

export default App;

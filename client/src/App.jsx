// Components
import {
	Checkbox,
	FormGroup,
	FormControlLabel,
	Typography,
	Stack,
	Divider,
	Link,
} from "@mui/material";

// Utilities
import { useState } from "react";

function App() {
	const [checkList, setCheckList] = useState({
		task1: false,
		task2: false,
		task3: false,
	});

	const handleCheck = (e) => {
		setCheckList((prev) => ({
			...prev,
			[e.target.name]: e.target.checked,
		}));
	};

	return (
		<Stack spacing={2}>
			<Typography variant="h2">Hello! Your job is to:</Typography>
			<Divider />
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							name="task1"
							checked={checkList.task1}
						/>
					}
					label="Add a button to this page."
					onChange={handleCheck}
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="task2"
							checked={checkList.task2}
						/>
					}
					label="Pressing the button should make a request to the server at /api/v1/{placeholder}"
					onChange={handleCheck}
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="task3"
							checked={checkList.task3}
						/>
					}
					label="Create a ResponseDisplay component to display the response."
					onChange={handleCheck}
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="task3"
							checked={checkList.task3}
						/>
					}
					label="The ResponseDisplay component should have two variants, one that dipslays data vertically and one that displays data horizontally."
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
			<Typography variant="h1">Replace me with your component!</Typography>
		</Stack>
	);
}

export default App;

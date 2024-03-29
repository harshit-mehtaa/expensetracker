import React, { useContext, useState } from "react";
// custom imports
import { GlobalContext } from "../App";
// MUI imports
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SnackbarAlert from "./SnackbarAlert";

const loginUser = async (credentials) => {
	const response = await fetch("/api/auth/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	
	var data = null;
	const status = await response.status;
	if (status === 200) {
		data = await response.json();
	}
	return [data, status];
};

function Login() {
    // eslint-disable-next-line
	const [global, setGlobal] = useContext(GlobalContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginData, setLoginData] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault();
		const [auth, status] = await loginUser({
			username,
			password,
		});

		if (auth) {
			if (auth.token) {
				setGlobal((prevValue) => ({
					...prevValue,
					auth: {
						...prevValue.auth,
						token: auth.token,
						created: auth.created,
						expires: auth.expires,
					},
					user: auth.user,
				}));
				localStorage.setItem("token", JSON.stringify(auth.token));
			}
		}
		else {
			setLoginData("failed")

			var message = null
			if (status === 500) {
				message = "Error processing the request. Please try again later"
			} else if (status === 400) {
				message = "Incorrect credentials or the user does not exist."
			}
			else { 
				message = "Error logging in. Status code: " + status
			}

			setGlobal((prevValue) => ({
				...prevValue,
				alert: {
					...prevValue.alert,
					open: true,
					message: message,
					severity: "error"
				},
			}));
		}
	};

	return (
		<>
			{ loginData === "failed" && <SnackbarAlert /> }

			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "80vh",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						{/* <FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/> */}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						{/* <Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid> */}
					</Box>
				</Box>
			</Container>
			
		</>
	);
}

export default Login;

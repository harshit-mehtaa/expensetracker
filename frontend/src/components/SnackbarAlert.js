import React, { useContext } from "react";
import { GlobalContext } from "../App";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../CONSTANTS.js";
// MUI imports
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function SnackbarAlert() {
	const [global, setGlobal] = useContext(GlobalContext);
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setGlobal((prevValue) => ({
			...prevValue,
			alert: {
				open: false,
				message: "",
				severity: "info",
			},
		}));
	};

	return (
		<Snackbar
			open={global.alert.open}
			autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
			onClose={handleClose}
		>
			<Alert
				elevation={6}
				variant="filled"
				onClose={handleClose}
				severity={global.alert.severity}
			>
				{global.alert.message}
			</Alert>
		</Snackbar>
	);
}

export default SnackbarAlert;

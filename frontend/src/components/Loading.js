import React from "react";
import Backdrop from "@mui/material/Backdrop";
import  CircularProgress from "@mui/material/CircularProgress";

function Loading({ open }) {
	return (
		<Backdrop open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}

export default Loading;

import React from "react";
import Typography from "@mui/material/Typography";

function Reports({title}) {
	return (
		<Typography variant="h4" mb={3}>
			{title}
		</Typography>
	);
}

export default Reports;

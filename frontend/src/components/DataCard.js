import React, { useContext } from "react";
import { fetchAndGetLists, getFormatedDate } from "./utils";
import { GlobalContext } from "../App";
// MUI imports
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
	DataGrid,
    GridToolbar,
} from "@mui/x-data-grid";

function DataCard({ title, rows, columns, ediMode }) {
	const [global, setGlobal] = useContext(GlobalContext);
    const [tableData, setTableData] = React.useState(rows);
	const [startDate, setStartDate] = React.useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = React.useState(
		new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
	);

	const handleCellDoubleClick = async (id) => {
		const usersList = await fetchAndGetLists("/api/users/GetNames");
        console.log("id.row", id.row);
        // const userObj = await fetchUser(`/api/users/${id.row.user}`);
        // console.log("userObj:", userObj);
        const user = usersList[usersList.find((u) => u.name === id.row.user).id];
        console.log(user);

		const categoriesList = await fetchAndGetLists(
			"/api/expenses/GetCategories"
		);
		const category =
			categoriesList[
				categoriesList
					.map((category) => category.name)
					.indexOf(id.row.category)
			];

		const modesList = await fetchAndGetLists("/api/expenses/GetModes");
		const mode =
			modesList[modesList.map((mode) => mode.name).indexOf(id.row.mode)];

        

		setGlobal((prevValue) => ({
			...prevValue,
			dialog: {
				open: true,
				mode: "edit",
			},
			expenses: {
				...prevValue.expenses,
				users: usersList,
				categories: categoriesList,
				modes: modesList,
				expense: {
					...prevValue.expense,
					id: id.row.id,
					date: id.row.date,
					user: user,
					category: category,
					mode: mode,
					amount: id.row.amount,
					details: id.row.details,
				},
			},
			activePage: "",
		}));
	};

    const handleSearch = async (event) => {
        const startDateString = getFormatedDate(startDate);
        const endDateString = getFormatedDate(endDate);
        const response = await fetch(`/api/expenses/?date_min=${startDateString}&date_max=${endDateString}`, {
            headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${JSON.parse(
					localStorage.getItem("token")
				)}`,
			},
        });
        if (response.ok) {
            const data = await response.json();
            setTableData(data);
        } else {
            console.log("error");
        }

    };

	return (
		<>
			{tableData && (
				<Stack spacing={3}>
					<Typography variant="h4" mb={3}>
						{title}
					</Typography>
					<Box>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<FormControl
								sx={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<Box sx={{ mr: 3 }}>
									<DesktopDatePicker
										label="Start Date"
										inputFormat="dd/MM/yyyy"
										value={startDate}
										onChange={(newValue) => {
											setStartDate(newValue);
										}}
										renderInput={(params) => (
											<TextField {...params} />
										)}
									/>
								</Box>
								<Box sx={{ mr: 3 }}>
									<DesktopDatePicker
										label="End Date"
										inputFormat="dd/MM/yyyy"
										value={endDate}
										onChange={(newValue) => {
											setEndDate(newValue);
										}}
										renderInput={(params) => (
											<TextField {...params} />
										)}
									/>
								</Box>
								<Button
									// variant="contained"
									color="primary"
									onClick={handleSearch}
								>
									Search
								</Button>
							</FormControl>
						</LocalizationProvider>
					</Box>
					<DataGrid
						autoHeight
						columns={columns}
						rows={tableData}
						editMode={ediMode}
						pageSize={global.pageSize}
						onPageSizeChange={(newPageSize) =>
							setGlobal((prevState) => ({
                                ...prevState,
                                pageSize: newPageSize,
                            }))
						}
						rowsPerPageOptions={[5, 10, 20, 50, 100]}
						pagination
						components={{
							Toolbar: GridToolbar,
						}}
						onCellDoubleClick={handleCellDoubleClick}
					/>
					<Toolbar />
				</Stack>
			)}
		</>
	);
}

export default DataCard;

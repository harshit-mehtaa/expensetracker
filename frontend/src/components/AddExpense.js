import React, { useState, useContext } from "react";
import { fetchAndGetLists } from "./utils";
import { GlobalContext } from "../App";
// Custom imports
import ExpenseForm from "./ExpenseForm";
// MUI imports
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function AddExpense() {
	const initialState = {
		users: [],
		categories: [],
		modes: [],
		expense: {
			date: new Date(),
			user: "",
			category: "",
			mode: "",
			amount: "",
			details: "",
		},
	};
    const [mode, setMode] = useState(undefined);
    const [global, setGlobal] = useContext(GlobalContext);
	const [expenseDetails, setExpenseDetails] = useState(initialState);

	const handleClickOpen = async () => {
		const usersList = await fetchAndGetLists("/api/users/GetNames");
		const categoriesList = await fetchAndGetLists(
			"/api/expenses/GetCategories"
		);
		const modesList = await fetchAndGetLists("/api/expenses/GetModes");

		setExpenseDetails((prevValue) => ({
			...prevValue,
			users: usersList,
			categories: categoriesList,
			modes: modesList,
			expense: {
				...prevValue.expense,
				date: new Date(),
				user: usersList[0],
				category: categoriesList[0],
				mode: modesList[0],
			},
		}));
        setMode("add");
        setGlobal((prevValue) => ({
            ...prevValue,
            dialogOpen: true,
            // activePage: "",
        }));
	};

	return (
		<>
			<Zoom
				key="primary"
				in={true}
				value={true}
				onClick={handleClickOpen}
                unmountOnExit={mode !== "add"}
			>
				<Fab
					sx={{
						position: "fixed",
						bottom: 30,
						right: 30,
						zIndex: "snackbar",
					}}
					aria-label="Add"
					color="primary"
				>
					<AddIcon />
				</Fab>
			</Zoom>
			{/* {mode && (
				<ExpenseForm expense={expenseDetails} mode={mode} open={global.dialogOpen} />
			// )} */}
		</>
	);
}

export default AddExpense;

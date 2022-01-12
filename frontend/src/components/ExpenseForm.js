import React, { useContext, useState } from "react";
import { GlobalContext } from "../App";
import { formatDate } from "../CONSTANTS";
import { fetchUser } from "./utils";
// MUI inports
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

function ExpenseForm({ expense }) {
	const [global, setGlobal] = useContext(GlobalContext);
	const [expenseDetails, setExpenseDetails] = useState(expense);

	const handleClose = () => {
		setGlobal((prevValue) => ({
			...prevValue,
			dialog: {
				...prevValue.dialog,
				open: false,
				mode: undefined,
			},
			activePage: "Home",
		}));
	};

	const handleSubmit = async () => {
		if (
			expenseDetails.expense.amount === "" ||
			expenseDetails.expense.amount === 0 ||
			expenseDetails.expense.amount === null ||
			expenseDetails.expense.amount === undefined
		) {
			alert("Amount should be more than 0");
			return;
		} else if (
			expenseDetails.expense.details === "" ||
			expenseDetails.expense.details === null ||
			expenseDetails.expense.details === undefined
		) {
			alert("Details should not be empty");
			return;
		} else {
			// console.log(expenseDetails);
			const user = await fetchUser(
				`/api/users/?name=${expenseDetails.expense.user.name}`
			);
			if (!user) {
				setGlobal((prevValue) => ({
					...prevValue,
					alert: {
						...prevValue.alert,
						open: true,
						message: "Something went wrong...",
						severity: "error",
					},
				}));
				return;
			}
            console.log("user:", user);
			const response = await fetch("/api/expenses/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Token ${JSON.parse(
						localStorage.getItem("token")
					)}`,
				},
				body: JSON.stringify({
					date: formatDate(expenseDetails.expense.date),
					user: user.id,
					category: expenseDetails.expense.category.name,
					mode: expenseDetails.expense.mode.name,
					amount: expenseDetails.expense.amount,
					details: expenseDetails.expense.details,
				}),
			});

			if (
				response.status === 200 ||
				response.status === 201 ||
				response.status === 202
			) {
				setGlobal((prevGlobal) => ({
					...prevGlobal,
					dialog: {
						...prevGlobal.dialog,
						open: false,
						mode: undefined,
					},
					alert: {
						...prevGlobal.alert,
						open: true,
						message: "Expense added successfully",
						severity: "success",
					},
					activePage: "Home",
				}));
			} else {
				setGlobal((prevGlobal) => ({
					...prevGlobal,
					alert: {
						...prevGlobal.alert,
						open: true,
						message: "Something went wrong. Please retry...",
					},
				}));
			}
		}
	};

	const handleUpdate = async () => {
		if (expenseDetails.expense === global.expenses.expense) {
			console.log("No changes were made");
			setGlobal((prevGlobal) => ({
				...prevGlobal,
				alert: {
					...prevGlobal.alert,
					open: true,
					message: "No changes made",
					severity: "info",
				},
			}));
			handleClose();
			return;
		}
		if (
			expenseDetails.expense.amount === "" ||
			expenseDetails.expense.amount === 0 ||
			expenseDetails.expense.amount === null ||
			expenseDetails.expense.amount === undefined
		) {
			alert("Amount should be more than 0");
			return;
		} else if (
			expenseDetails.expense.details === "" ||
			expenseDetails.expense.details === null ||
			expenseDetails.expense.details === undefined
		) {
			alert("Details should not be empty");
			return;
		} else {
            console.log(expenseDetails);
			const user = await fetchUser(
				`/api/users/?name=${expenseDetails.expense.user.name}`
			);
			if (!user) {
				setGlobal((prevValue) => ({
					...prevValue,
					alert: {
						...prevValue.alert,
						open: true,
						message: "Something went wrong...",
						severity: "error",
					},
				}));
				return;
			}
			const response = await fetch(
				`/api/expenses/${expenseDetails.expense.id}/`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
                        "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`,
					},
					body: JSON.stringify({
						date: formatDate(expenseDetails.expense.date),
						user: user.id,
						category: expenseDetails.expense.category.name,
						mode: expenseDetails.expense.mode.name,
						amount: expenseDetails.expense.amount,
						details: expenseDetails.expense.details,
					}),
				}
			);
			if (
				response.status === 200 ||
				response.status === 201 ||
				response.status === 204
			) {
				setGlobal((prevGlobal) => ({
					...prevGlobal,
					dialog: {
						...prevGlobal.dialog,
						open: false,
						mode: undefined,
					},
					alert: {
						...prevGlobal.alert,
						open: true,
						message: "Expense updated successfully",
						severity: "success",
					},
					activePage: "Home",
				}));
			} else {
				setGlobal((prevGlobal) => ({
					...prevGlobal,
					alert: {
						...prevGlobal.alert,
						open: true,
						message: "Something went wrong. Please retry...",
						severity: "error",
					},
				}));
			}
		}
	};

	const handleDelete = async () => {
		const response = await fetch(
			`/api/expenses/${expenseDetails.expense.id}/`,
			{
				method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`,
                },
			}
		);
		if (response.status === 204) {
			setGlobal((prevGlobal) => ({
				...prevGlobal,
				dialog: {
					...prevGlobal.dialog,
					open: false,
					mode: undefined,
				},
				alert: {
					...prevGlobal.alert,
					open: true,
					message: "Expense deleted successfully",
					severity: "success",
				},
				activePage: "Home",
			}));
		} else {
			setGlobal((prevGlobal) => ({
				...prevGlobal,
				alert: {
					...prevGlobal.alert,
					open: true,
					message: "Something went wrong. Please retry...",
					severity: "error",
				},
			}));
		}
	};

	return (
		<Dialog open={global.dialog.open} onClose={handleClose} maxWidth="lg">
			<DialogTitle>
				Add Expense
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<DialogContentText mb={3} />
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Stack spacing={3}>
						<DesktopDatePicker
							label="Expense Date"
							inputFormat="dd/MM/yyyy"
							value={expenseDetails.expense.date}
							onChange={(event) => {
								setExpenseDetails((prevValues) => ({
									...prevValues,
									expense: {
										...prevValues.expense,
										date: event,
									},
								}));
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
						<Autocomplete
							// {...defaultProps}
							id="user-select"
							autoFocus
							openOnFocus
							isOptionEqualToValue={(option, value) =>
								option.title === value.title
							}
							options={expenseDetails.users}
							getOptionLabel={(option) => option.name}
							value={expenseDetails.expense.user}
							onChange={(event, newValue) => {
								setExpenseDetails((prevValues) => ({
									...prevValues,
									expense: {
										...prevValues.expense,
										user: newValue,
									},
								}));
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="User"
									variant="standard"
								/>
							)}
						/>
						<Autocomplete
							// {...defaultProps}
							id="category-select"
							openOnFocus
							options={expenseDetails.categories}
							getOptionLabel={(option) => option.name}
							value={expenseDetails.expense.category}
							onChange={(event, newValue) => {
								setExpenseDetails((prevValues) => ({
									...prevValues,
									expense: {
										...prevValues.expense,
										category: newValue,
									},
								}));
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Expense Category"
									variant="standard"
								/>
							)}
						/>
						<Autocomplete
							// {...defaultProps}
							id="mode-select"
							openOnFocus
							options={expenseDetails.modes}
							getOptionLabel={(option) => option.name}
							value={expenseDetails.expense.mode}
							onChange={(event, newValue) => {
								setExpenseDetails((prevValues) => ({
									...prevValues,
									expense: {
										...prevValues.expense,
										mode: newValue,
									},
								}));
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Expense Mode"
									variant="standard"
								/>
							)}
						/>
						<FormControl fullWidth sx={{ m: 1 }}>
							<InputLabel htmlFor="outlined-adornment-amount">
								Amount
							</InputLabel>
							<OutlinedInput
								id="amount-input"
								value={expenseDetails.expense.amount}
								type="number"
								onChange={(event) => {
									setExpenseDetails((prevValues) => ({
										...prevValues,
										expense: {
											...prevValues.expense,
											amount: event.target.value,
										},
									}));
								}}
								startAdornment={
									<InputAdornment position="start">
										₹
									</InputAdornment>
								}
								placeholder="0"
								label="Amount"
							/>
						</FormControl>
						<TextField
							// fullWidth
							sx={{ width: "lg" }}
							id="details-input"
							label="Expense Detail"
							type="text"
							value={expenseDetails.expense.details}
							onChange={(event) => {
								setExpenseDetails((prevValues) => ({
									...prevValues,
									expense: {
										...prevValues.expense,
										details: event.target.value,
									},
								}));
							}}
							variant="standard"
						/>
					</Stack>
				</LocalizationProvider>
			</DialogContent>
			<DialogActions>
				{global.dialog.mode === "add" ? (
					<Button onClick={handleSubmit}>Submit</Button>
				) : (
					<>
						<Button onClick={handleDelete} color="error">
							Delete
						</Button>
						<Button onClick={handleUpdate}>Update</Button>
					</>
				)}
			</DialogActions>
		</Dialog>
	);
}

export default ExpenseForm;

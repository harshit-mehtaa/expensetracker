import React, { useContext } from "react";
import { fetchAndGetLists } from "./utils";
import { GlobalContext } from "../App";
// Custom imports
import Home from "./Home";
import Reports from "./Reports";
import Dashboard from "./Dashboard";
import ExpenseForm from "./ExpenseForm";
import SnackbarAlert from "./SnackbarAlert";
// MUI imports
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Popover from "@mui/material/Popover";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import PersonIcon from "@mui/icons-material/Person";
// import { MenuList } from "@mui/material";
import UserProfile from "./UserProfile";

export default function MainPage() {
	const [global, setGlobal] = useContext(GlobalContext);

	// const [anchorEl, setAnchorEl] = React.useState(null);
	// const open = Boolean(anchorEl);
	// const handleClick = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };
	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

	const handleClickOpen = async () => {
		const usersList = await fetchAndGetLists("/api/users/GetNames");
		const categoriesList = await fetchAndGetLists(
			"/api/expenses/GetCategories"
		);
		const modesList = await fetchAndGetLists("/api/expenses/GetModes");
		setGlobal((prevValue) => ({
			...prevValue,
			dialog: {
				open: true,
				mode: "add",
			},
			expenses: {
				...prevValue.expenses,
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
			},
			activePage: "",
		}));
	};

	return (
		<Box
			component="main"
			sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
		>
			<Toolbar />
			{global.activePage === "Dashboard" && <Dashboard />}
			{global.activePage === "Home" && <Home />}
			{global.activePage === "Reports" && <Reports title="Reports" />}
			{global.activePage === "Profile" && <UserProfile />}
			<Zoom
				key="primary"
				in={true}
				value={true}
				onClick={handleClickOpen}
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
			<SnackbarAlert />
			{global.dialog.open && <ExpenseForm expense={global.expenses} />}

			{/* <Zoom key="primary" in={true} value={true} onClick={handleClick}>
				<Fab
					sx={{
						position: "fixed",
						bottom: 90,
						right: 30,
						zIndex: "snackbar",
					}}
					aria-label="Add"
					color="primary"
				>
					<AddIcon />
				</Fab>
			</Zoom>
			<Menu
				id="demo-positioned-menu"
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				// style={{
				//     .MuiMenu-root
				// }}
			>
				<MenuList>
					<MenuItem>
						<Fab
							sx={{
								zIndex: "snackbar",
							}}
							aria-label="User"
							// color="primary"
						>
							<PersonIcon />
						</Fab>
					</MenuItem>
					<MenuItem>
						<Fab
							sx={{
								zIndex: "snackbar",
							}}
							aria-label="User"
							// color="primary"
						>
							<CurrencyRupeeIcon />
						</Fab>
					</MenuItem>
				</MenuList>
			</Menu> */}
		</Box>
	);
}

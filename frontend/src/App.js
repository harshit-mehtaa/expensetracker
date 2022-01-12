import React, { createContext, useState, lazy, Suspense } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
// import TopBar from "./components/TopBar";
import SideNav from "./components/SideNav";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
// import Container from "@mui/material/Container";
// import useToken from "./hooks/useToken";
// import UserProfile from "./components/UserProfile";

export const GlobalContext = createContext([{}, () => {}]);
const globalValues = {
	activePage: "Dashboard",
	alert: {
		open: false,
		message: "",
		severity: "info",
	},
	auth: {
		token: undefined,
		created: undefined,
		expires: undefined,
	},
	dialog: {
		open: false,
		mode: undefined,
	},
	expenses: {
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
	},
    pageSize: 5,
	user: undefined,
};

const TopBar = lazy(() => import("./components/TopBar"));

export default function App() {
	const [global, setGlobal] = useState(globalValues);

	if (!global.auth.token) {
		return (
			<GlobalContext.Provider value={[global, setGlobal]}>
				<CssBaseline />
				<Login />
			</GlobalContext.Provider>
		);
	}

	return (
		<GlobalContext.Provider value={[global, setGlobal]}>
			<CssBaseline />
			<Box sx={{ display: "flex" }}>
				<Suspense fallback={<div>Home</div>}>
					<TopBar />
				</Suspense>
				<SideNav />
				<MainPage />
			</Box>
		</GlobalContext.Provider>
	);
}

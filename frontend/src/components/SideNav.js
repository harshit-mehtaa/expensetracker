import React, { useContext } from "react";
// Custom imports
import { DRAWER_WIDTH } from "../CONSTANTS";
import { GlobalContext } from "../App";
// MUI imports
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import SummarizeIcon from "@mui/icons-material/Summarize";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function SideNav() {
	const [global, setGlobal] = useContext(GlobalContext);

	return (
		<Drawer
			sx={{
				width: DRAWER_WIDTH,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: DRAWER_WIDTH,
					boxSizing: "border-box",
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<Toolbar />
			<Divider />
			<List>
				<ListItem
					selected={global.activePage === "Dashboard"}
					button
					key="Dashboard"
					onClick={() =>
						setGlobal((prevGlobal) => ({
							...global,
							activePage: "Dashboard",
						}))
					}
				>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItem>
				<Divider />
				<ListItem
					selected={global.activePage === "Home"}
					button
					key="Home"
					onClick={() =>
						setGlobal((prevGlobal) => ({
							...prevGlobal,
							activePage: "Home",
						}))
					}
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem
					selected={global.activePage === "Reports"}
					button
					key="Reports"
					onClick={() =>
						setGlobal((prevGlobal) => ({
							...global,
							activePage: "Reports",
						}))
					}
				>
					<ListItemIcon>
						<SummarizeIcon />
					</ListItemIcon>
					<ListItemText primary="Reports" />
				</ListItem>
			</List>
		</Drawer>
	);
}

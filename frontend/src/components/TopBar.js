import React, { useContext } from "react";
// custom imports
import { DRAWER_WIDTH } from "../CONSTANTS";
import { GlobalContext } from "../App";
// MUI imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function stringToColor(string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name) {
	var childrenName = name.includes(" ") ? `${name.split(" ")[0][0].toUpperCase()}${name.split(" ")[1][0].toUpperCase()}` : name[0].toUpperCase()

	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: childrenName,
	};
}

const logoutUser = async (credentials) => {
	const response = await fetch("/api/auth/", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	const status = await response.status;
	if (status === 200) {
		return true;
	}
	return false;
};

export default function TopBar() {
	const [global, setGlobal] = useContext(GlobalContext);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

    const handleUserProfile = () => {
        setAnchorEl(null);
        setGlobal((prevValue) => ({
            ...prevValue,
            activePage: "Profile",
        }));
    };

	const handleLogout = async () => {
		setAnchorEl(null);
		const logoutSuccess = await logoutUser({
			username: global.user.email,
		});
		if (logoutSuccess) {
			setGlobal((prevValue) => ({
				...prevValue,
				auth: {
					...prevValue.auth,
					token: null,
					created: null,
					expires: null,
				},
				user: null,
			}));
            localStorage.removeItem("token");
		}
	};

	return (
		<Box>
			<AppBar
				position="fixed"
				sx={{
					width: `calc(100% - ${DRAWER_WIDTH}px)`,
					ml: `${DRAWER_WIDTH}px`,
				}}
			>
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						{global.activePage}
					</Typography>
					<Tooltip title="Account settings">
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							{/* <AccountCircle /> */}
							<Avatar {...stringAvatar(global.user.name)} />
						</IconButton>
					</Tooltip>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleUserProfile}>
							<ListItemIcon>
								<AccountCircleIcon fontSize="small" />
							</ListItemIcon>
							Profile
						</MenuItem>
						<MenuItem onClick={handleLogout}>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

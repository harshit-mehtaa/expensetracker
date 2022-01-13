import React, { useEffect, useContext } from "react";
// Custom Hooks
import useApiCall from "../hooks/useApiCall";
// Custom Components
import { GlobalContext } from "../App";
import { getFormatedDate } from './utils';
import Loading from "./Loading";
import SnackbarAlert from "./SnackbarAlert";
// MUI imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import InputAdornment from "@mui/material/InputAdornment";

function UserProfile() {
    // eslint-disable-next-line
	const [global, setGlobal] = useContext(GlobalContext);
	const [loading, userProfile, status] = useApiCall(
		`/api/users/full/${global.user.id}`
	);
    const [loadingS, statesList, statusS] = useApiCall("/api/users/GetStates/");
	const [user, setUser] = React.useState(null);

    useEffect(() => {
        setUser(userProfile);
    }, [userProfile])

    const handleUpdate = () => {
        console.log("handleUpdate");
        console.log("user:", user);
    };

	return (
		<>
			{loading || loadingS ? (
				<Loading open={loading} />
			) : status !== null || statusS !== null ? (
				<>
					<Typography variant="h4" mb={3}>
						User Profile
					</Typography>
					<Card>
						{/* <CardHeader /> */}
						<CardContent>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<Stack spacing={3}>
									<Box>
										<Typography variant="h6" mb={1}>
											Personal Information
										</Typography>
										<Divider />
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												alignItems: "start",
												"& > :not(style)": { m: 1 },
												mt: 2,
											}}
											spacing={2}
										>
											{/* <FormLabel>Name</FormLabel> */}
											<TextField
												required
												id="name"
												label="Name"
                                                helperText="Please enter your full name"
												value={user.name}
												onChange={(e) => {
													setUser((prevValue) => ({
														...prevValue,
														name: e.target.value,
													}));
												}}
												sx={{ m: 1, width: "29ch" }}
											/>
											{/* <FormLabel>Email</FormLabel> */}
											<TextField
												required
												id="email"
                                                helperText="Please enter your primary email address"
												label="Email"
												value={user.email}
												onChange={(e) => {
													setUser((prevValue) => ({
														...prevValue,
														email: e.target.value,
													}));
												}}
												sx={{ m: 1, width: "29ch" }}
											/>
											{/* <FormLabel>DOB</FormLabel> */}
											<DesktopDatePicker
												label="Date of Birth"
												inputFormat="dd/MM/yyyy"
												value={
													user.additional_info?.dob
												}
												onChange={(newValue) => {
													setUser((prevValues) => ({
														...prevValues,
														additional_info: {
                                                            ...prevValues.additional_info,
                                                            dob: getFormatedDate(newValue),
                                                        },
													}));
												}}
												renderInput={(params) => (
													<TextField
														required
														{...params}
													/>
												)}
												sx={{ m: 1, width: "29ch" }}
											/>
											{/* <FormLabel>Gender</FormLabel> */}
											<FormControl component="fieldset">
												<FormLabel component="legend">
													Gender
												</FormLabel>
												<RadioGroup
													row
													required
													aria-label="gender"
													// name="controlled-radio-buttons-group"
													value={
														user.additional_info?.gender
													}
													onChange={(e) => {
														setUser((prevValues) => ({
                                                            ...prevValues,
                                                            additional_info: {
                                                                ...prevValues.additional_info,
                                                                gender: e.target.value,
                                                            },
                                                        }));
													}}
												>
													<FormControlLabel
														value="Female"
														control={<Radio />}
														label="Female"
													/>
													<FormControlLabel
														value="Male"
														control={<Radio />}
														label="Male"
													/>
												</RadioGroup>
											</FormControl>
										</Box>
									</Box>
									<Box>
										<Typography variant="h6" mb={1}>
											Additional Information
										</Typography>
										<Divider />
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												"& > :not(style)": { m: 1 },
												mt: 2,
											}}
										>
											<TextField
												required
												label="Primary Contact Number"
												id="mobile"
												value={
													user.additional_info?.contact?.mobile
												}
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', length: 6 }}
												sx={{ m: 1, width: "29ch" }}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															91
														</InputAdornment>
													),
												}}
                                                onChange={(e) => {
                                                    setUser((prevValues) => ({
                                                        ...prevValues,
                                                        additional_info: {
                                                            ...prevValues.additional_info,
                                                            contact: {
                                                                ...prevValues.additional_info.contact,
                                                                mobile: e.target.value,
                                                            },
                                                        },
                                                    }));
                                                }}
											/>
											<TextField
												label="Additional Contact Number"
												id="additional-mobile"
												value={
													user.additional_info?.contact?.additional_mobile
												}
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', length: 6 }}
												sx={{ m: 1, width: "29ch" }}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															91
														</InputAdornment>
													),
												}}
                                                onChange={(e) => {
                                                    setUser((prevValues) => ({
                                                        ...prevValues,
                                                        additional_info: {
                                                            ...prevValues.additional_info,
                                                            contact: {
                                                                ...prevValues.additional_info.contact,
                                                                additional_mobile: e.target.value,
                                                            },
                                                        },
                                                    }));
                                                }}
											/>
											<TextField
												label="Additional Email"
												id="additional-email"
												value={
													user.additional_info?.contact?.additional_email
												}
												sx={{ m: 1, width: "29ch" }}
                                                onChange={(e) => {
                                                    setUser((prevValues) => ({
                                                        ...prevValues,
                                                        additional_info: {
                                                            ...prevValues.additional_info,
                                                            contact: {
                                                                ...prevValues.additional_info.contact,
                                                                additional_email: e.target.value,
                                                            },
                                                        },
                                                    }));
                                                }}
											/>
										</Box>
									</Box>
									<Box>
										<Typography variant="h6" mb={1}>
											Know Your Customer (KYC)
										</Typography>
										<Divider />
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												"& > :not(style)": { m: 1 },
												mt: 2,
											}}
										>
											<TextField
												required
												label="Permanent Account Number"
												id="pan"
												value={
													user.additional_info?.kyc?.pan
												}
												sx={{ m: 1, width: "29ch" }}
												onChange={(e) => {
                                                    setUser((prevValues) => ({
                                                        ...prevValues,
                                                        additional_info: {
                                                            ...prevValues.additional_info,
                                                            kyc: {
                                                                ...prevValues.additional_info.kyc,
                                                                pan: e.target.value,
                                                            },
                                                        },
                                                    }));
                                                }}
											/>
											<TextField
												required
												label="Aadhar Number"
												id="aadhar"
												value={
													user.additional_info?.kyc?.aadhar
												}
												sx={{ m: 1, width: "29ch" }}
												inputProps={{
													inputMode: "numeric",
													pattern: "[0-9]*",
												}}
                                                onChange={(e) => {
                                                    setUser((prevValues) => ({
                                                        ...prevValues,
                                                        additional_info: {
                                                            ...prevValues.additional_info,
                                                            kyc: {
                                                                ...prevValues.additional_info.kyc,
                                                                aadhar: e.target.value,
                                                            },
                                                        },
                                                    }));
                                                }}
											/>
										</Box>
									</Box>
                                    <Box>
                                        <Typography variant="h6" mb={1}>
                                            Address
                                        </Typography>
                                        <Divider />
                                        <Box
											sx={{
												display: "flex",
												alignItems: "center",
												"& > :not(style)": { m: 1 },
												mt: 2,
											}}
										>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Address"
                                                id="address"
                                                value={
                                                    user.additional_info?.address?.address
                                                }
                                                sx={{ m: 1}}
                                                onChange={(e) => {
                                                    setUser((prevValues) => ({
                                                        ...prevValues,
                                                        additional_info: {
                                                            ...prevValues.additional_info,
                                                            address: {
                                                                ...prevValues.additional_info.address,
                                                                address: e.target.value,
                                                            },
                                                        },
                                                    }));
                                                }}
                                            />
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    "& > :not(style)": { m: 1 },
                                                    mt: 2,
                                                }}
                                            >
                                            <TextField
                                                label="Landmark"
                                                id="landmark"
                                                value={
                                                    user.additional_info?.address?.landmark
                                                }
                                                sx={{ m: 1, width: "29ch" }}
                                                onChange={(e) => {
                                                    setUser((prevValues) => ({
                                                        ...prevValues,
                                                        additional_info: {
                                                            ...prevValues.additional_info,
                                                            address: {
                                                                ...prevValues.additional_info.address,
                                                                landmark: e.target.value,
                                                            },
                                                        },
                                                    }));
                                                }}
                                            />
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    "& > :not(style)": { m: 1 },
                                                    mt: 2,
                                                }}
                                            >
                                            <TextField
                                                required
                                                label="City"
                                                id="city"
                                                value={
                                                    user.additional_info?.address?.city
                                                }
                                                sx={{ m: 1, width: "29ch" }}
                                                onChange={(e) => {
                                                    setUser((prevValues) => ({
                                                        ...prevValues,
                                                        additional_info: {
                                                            ...prevValues.additional_info,
                                                            address: {
                                                                ...prevValues.additional_info.address,
                                                                city: e.target.value,
                                                            },
                                                        },
                                                    }));
                                                }}
                                            />
                                            <FormControl>
                                                <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
                                                <Select
                                                    required
                                                    labelId="demo-simple-select-standard-label"
                                                    label="State"
                                                    id="state"
                                                    value={user.additional_info?.address?.state}
                                                    sx={{ width: "29ch" }}
                                                    onChange={(e) => {
                                                        setUser((prevValues) => ({
                                                            ...prevValues,
                                                            additional_info: {
                                                                ...prevValues.additional_info,
                                                                address: {
                                                                    ...prevValues.additional_info.address,
                                                                    state: e.target.value,
                                                                },
                                                            },
                                                        }));
                                                    }}
                                                >
                                                    {
                                                        statesList.map((state) => (
                                                            <MenuItem key={state} value={state}>{state}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl >
                                            <TextField
                                                required
                                                label="Pincode"
                                                id="pincode"
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', length: 6 }}
                                                value={
                                                    user.additional_info?.address?.pincode
                                                }
                                                sx={{ m: 1, width: "29ch" }}
                                                onChange={(e) => {
                                                    setUser((prevValues) => ({
                                                        ...prevValues,
                                                        additional_info: {
                                                            ...prevValues.additional_info,
                                                            address: {
                                                                ...prevValues.additional_info.address,
                                                                pincode: e.target.value,
                                                            },
                                                        },
                                                    }));
                                                }}
                                            />
                                        </Box>
                                    </Box>
									<Box>
										<Typography variant="h6" mb={1}>
											Permissions
										</Typography>
										<Divider />
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												"& > :not(style)": { m: 1 },
												mt: 2,
											}}
										>
											{userProfile.is_superuser && (
												<FormGroup row>
													<FormControlLabel
														control={
															<Checkbox
																id="is_superuser"
																label="Superuser"
																checked={
																	user.is_superuser
																}
																onChange={(e) => {
																	setUser((prevValue) => ({
																			...prevValue,
																			is_superuser: e.target.checked,
																		})
																	);
																}}
															/>
														}
														label="Superuser"
													/>
													<FormControlLabel
														control={
															<Checkbox
																id="is_staff"
																label="Staff"
																checked={
																	user.is_staff
																}
																onChange={(e) => {
																	setUser((prevValue) => ({
																			...prevValue,
																			is_staff: e.target.checked,
																		})
																	);
																}}
															/>
														}
														label="Staff"
													/>
													<FormControlLabel
														control={
															<Checkbox
																id="is_active"
																label="Active"
																checked={
																	user.is_active
																}
																onChange={(e) => {
																	setUser((prevValue) => ({
																			...prevValue,
																			is_active:
																				e.target.checked,
																		})
																	);
																}}
															/>
														}
														label="Active"
													/>
												</FormGroup>
											)}
										</Box>
									</Box>
									<Box>
										<Typography variant="h6" mb={1}>
											Change Password
										</Typography>
										<Divider />
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												"& > :not(style)": { m: 1 },
												mt: 2,
											}}
										>
											{/* <FormLabel>Password</FormLabel> */}
											<TextField
												id="password"
												name="Name"
												label="Password"
												// value={user.password}
												type="password"
												onChange={(e) => {
													setUser((prevValue) => ({
														...prevValue,
														password:
															e.target.value,
													}));
												}}
												sx={{ m: 1, width: "29ch" }}
											/>
											<TextField
												id="password2"
												name="Confirm Password"
												label="Confirm Password"
												// value={user.password}
												type="password"
												onChange={(e) => {
													setUser((prevValue) => ({
														...prevValue,
														password2:
															e.target.value,
													}));
												}}
												sx={{ m: 1, width: "29ch" }}
											/>
										</Box>
									</Box>
								</Stack>
							</LocalizationProvider>
						</CardContent>
						<CardActions
							sx={{
								justifyContent: "flex-end",
								"& > *": {
									m: 3,
								},
							}}
						>
							<Button
								variant="contained"
								color="primary"
								onClick={handleUpdate}
							>
								Update
							</Button>
						</CardActions>
					</Card>
					<Toolbar />
					<Toolbar />
				</>
			) : (
				<SnackbarAlert severity="error" message="No data found" />
			)}
		</>
		// <Card>
		// 	<CardHeader title="User Profile" />
		// 	<CardContent>
		// 		<Stack spacing={3}>
		// 			<Typography variant="h6">Personal Information</Typography>
		// 			<Box
		// 				sx={{
		// 					display: "flex",
		// 					alignItems: "center",
		// 					"& > :not(style)": { m: 1 },
		// 				}}
		// 			>
		// 				{/* <FormLabel>Name</FormLabel> */}
		// 				<TextField
		// 					id="name"
		// 					label="Name"
		// 					value={user.name}
		// 					onChange={(e) => {
		// 						setUser((prevValue) => ({
		// 							...prevValue,
		// 							name: e.target.value,
		// 						}));
		// 					}}
		// 				/>
		// 				{/* </Box>
		// 			<Box> */}
		// 				{/* <FormLabel>Email</FormLabel> */}
		// 				<TextField
		// 					id="email"
		// 					label="Email"
		// 					value={user.email}
		// 					onChange={(e) => {
		// 						setUser((prevValue) => ({
		// 							...prevValue,
		// 							email: e.target.value,
		// 						}));
		// 					}}
		// 				/>
		// 			</Box>
		// 			<Typography variant="h6">Additional Information</Typography>
		// 			<Box>
		// 				<FormControl component="fieldset">
		// 					<FormLabel component="legend">Gender</FormLabel>
		// 					<RadioGroup
		// 						aria-label="gender"
		// 						name="controlled-radio-buttons-group"
		// 						// value={value}
		// 						onChange={(e) => {
		// 							setUser((prevValue) => ({
		// 								...prevValue,
		// 								gender: e.target.value,
		// 							}));
		// 						}}
		// 					>
		// 						<FormControlLabel
		// 							value="female"
		// 							control={<Radio />}
		// 							label="Female"
		// 						/>
		// 						<FormControlLabel
		// 							value="male"
		// 							control={<Radio />}
		// 							label="Male"
		// 						/>
		// 					</RadioGroup>
		// 				</FormControl>
		// 			</Box>
		// 			<Box>
		// 				{/* <FormLabel>Password</FormLabel> */}
		// 				<TextField
		// 					id="password"
		// 					label="Password"
		// 					// value={user.password
		// 					type="password"
		// 					onChange={(e) => {
		// 						setUser((prevValue) => ({
		// 							...prevValue,
		// 							password: e.target.value,
		// 						}));
		// 					}}
		// 				/>
		// 			</Box>
		// 			<Box>
		// 				{user.is_superuser && (
		// 					<FormGroup>
		// 						<FormControlLabel
		// 							control={
		// 								<Checkbox
		// 									id="is_superuser"
		// 									label="Superuser"
		// 									checked={user.is_superuser}
		// 									onChange={(e) => {
		// 										setUser((prevValue) => ({
		// 											...prevValue,
		// 											is_superuser:
		// 												e.target.checked,
		// 										}));
		// 									}}
		// 								/>
		// 							}
		// 							label="Superuser"
		// 						/>
		// 						<FormControlLabel
		// 							control={
		// 								<Checkbox
		// 									id="is_staff"
		// 									label="Staff"
		// 									checked={user.is_staff}
		// 									onChange={(e) => {
		// 										setUser((prevValue) => ({
		// 											...prevValue,
		// 											is_staff: e.target.checked,
		// 										}));
		// 									}}
		// 								/>
		// 							}
		// 							label="Staff"
		// 						/>
		// 						<FormControlLabel
		// 							control={
		// 								<Checkbox
		// 									id="is_active"
		// 									label="Active"
		// 									checked={user.is_active}
		// 									onChange={(e) => {
		// 										setUser((prevValue) => ({
		// 											...prevValue,
		// 											is_active: e.target.checked,
		// 										}));
		// 									}}
		// 								/>
		// 							}
		// 							label="Active"
		// 						/>
		// 					</FormGroup>
		// 				)}
		// 			</Box>
		// 		</Stack>
		// 	</CardContent>
		// </Card>

		// <Container component="main">
		// 	<Box
		// 		sx={{
		// 			display: "flex",
		// 			flexDirection: "column",
		// 			alignItems: "center",
		// 			// justifyContent: "center",
		// 			// minHeight: "80vh",
		// 		}}
		// 	>
		// 		<Typography variant="h4" component="h1" mb={3} >
		// 			User Profile
		// 		</Typography>

		// 		<Stack spacing={3}>
		// {/* <FormLabel>Name</FormLabel> */}
		// <TextField
		// 	id="name"
		// 	label="Name"
		// 	value={data.name}
		// 	onChange={(e) => {
		// 		setUser((prevValue) => ({
		// 			...prevValue,
		// 			name: e.target.value,
		// 		}));
		// 	}}
		// />
		// {/* <FormLabel>Email</FormLabel> */}
		// <TextField
		// 	id="email"
		// 	label="Email"
		// 	value={data.email}
		// 	onChange={(e) => {
		// 		setUser((prevValue) => ({
		// 			...prevValue,
		// 			email: e.target.value,
		// 		}));
		// 	}}
		// />
		// {/* <FormLabel>Password</FormLabel> */}
		// <TextField
		// 	id="password"
		// 	label="Password"
		// 	// value={data.password
		// 	type="password"
		// 	onChange={(e) => {
		// 		setUser((prevValue) => ({
		// 			...prevValue,
		// 			password: e.target.value,
		// 		}));
		// 	}}
		// />
		// {data.is_superuser && (
		// 	<FormGroup>
		// 		<FormControlLabel
		// 			control={
		// 				<Checkbox
		// 					id="is_superuser"
		// 					label="Superuser"
		// 					checked={data.is_superuser}
		// 					onChange={(e) => {
		// 						setUser((prevValue) => ({
		// 							...prevValue,
		// 							is_superuser: e.target.checked,
		// 						}));
		// 					}}
		// 				/>
		// 			}
		// 			label="Superuser"
		// 		/>
		// 		<FormControlLabel
		// 			control={
		// 				<Checkbox
		// 					id="is_staff"
		// 					label="Staff"
		// 					checked={data.is_staff}
		// 					onChange={(e) => {
		// 						setUser((prevValue) => ({
		// 							...prevValue,
		// 							is_staff: e.target.checked,
		// 						}));
		// 					}}
		// 				/>
		// 			}
		// 			label="Staff"
		// 		/>
		// 		<FormControlLabel
		// 			control={
		// 				<Checkbox
		// 					id="is_active"
		// 					label="Active"
		// 					checked={data.is_active}
		// 					onChange={(e) => {
		// 						setUser((prevValue) => ({
		// 							...prevValue,
		// 							is_active: e.target.checked,
		// 						}));
		// 					}}
		// 				/>
		// 			}
		// 			label="Active"
		// 		/>
		// 	</FormGroup>
		// )}
		// 		</Stack>
		// 	</Box>
		// </Container>
	);
}

export default UserProfile;

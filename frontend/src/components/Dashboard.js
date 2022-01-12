import React from "react";
// Custom hooks
import useApiCall from "../hooks/useApiCall";
// MUI imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
// Chart.js
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	BarElement,
	ArcElement,
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { Divider } from "@mui/material";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const BACKGROUND_COLORS = [
	"rgba(255, 99, 132, 0.2)",
	"rgba(54, 162, 235, 0.2)",
	"rgba(255, 206, 86, 0.2)",
	"rgba(75, 192, 192, 0.2)",
	"rgba(153, 102, 255, 0.2)",
	"rgba(255, 159, 64, 0.2)",
];
const BORDER_COLORS = [
	"rgba(255, 99, 132, 1)",
	"rgba(54, 162, 235, 1)",
	"rgba(255, 206, 86, 1)",
	"rgba(75, 192, 192, 1)",
	"rgba(153, 102, 255, 1)",
	"rgba(255, 159, 64, 1)",
];

function getLabels(data) {
	let labels = [];
	data &&
		data.forEach((element) =>
			Object.keys(element).forEach((key) => labels.push(key))
		);
	return labels;
}

function getData(data) {
	let values = [];
	data &&
		data.forEach((element) =>
			Object.values(element).forEach((value) => values.push(value))
		);
	return values;
}

function Dashboard() {
	// Monthly data
	const [loadingM, dataM, statusM] = useApiCall("/api/expenses/by-month");
	const [chartTypeMonth, setChartTypeMonth] = React.useState("line");
	const monthlyLabels = !loadingM ? getLabels(dataM) : null;
	const monthlyData = !loadingM ? getData(dataM) : null;

	const monthlyDataset = {
		labels: monthlyLabels,
		datasets: [
			{
				id: "Monthly Dataset 1",
				label: "Total expense",
				data: monthlyData,
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};

	const optionsM = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Monthly Expenses",
			},
		},
	};

	const handleChartTypeMonth = (event) => {
		setChartTypeMonth(event.target.value);
	};

	// Yearly data
	const [loadingY, dataY, statusY] = useApiCall("/api/expenses/by-year");
	const [chartTypeYear, setChartTypeYear] = React.useState("line");
	const yearlyLabels = !loadingY ? getLabels(dataY) : null;
	const yearlyData = !loadingY ? getData(dataY) : null;
	const backgroundColorY = !loadingY
		? yearlyLabels.map(
				(label, index) =>
					BACKGROUND_COLORS[index % BACKGROUND_COLORS.length]
		  )
		: null;
	const borderColorY = !loadingY
		? yearlyLabels.map(
				(label, index) => BORDER_COLORS[index % BORDER_COLORS.length]
		  )
		: null;

	const yearlyDataset = {
		labels: yearlyLabels,
		datasets: [
			{
				id: "Yearly Dataset 1",
				label: "Total yearly expense",
				data: yearlyData,
				borderColor: borderColorY,
				backgroundColor: backgroundColorY,
				borderWidth: 1,
			},
		],
	};
	const optionsY = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Yearly Expenses",
			},
		},
	};

	const handleChartTypeYear = (event) => {
		setChartTypeYear(event.target.value);
	};

	// User data
	const [loadingU, dataU, statusU] = useApiCall("/api/expenses/by-user");
	const [chartTypeUser, setChartTypeUser] = React.useState("bar");
	const userLabels = !loadingU ? getLabels(dataU) : null;
	const userData = !loadingU ? getData(dataU) : null;
	const backgroundColorU = !loadingU
		? userLabels.map(
				(label, index) =>
					BACKGROUND_COLORS[index % BACKGROUND_COLORS.length]
		  )
		: null;
	const borderColorU = !loadingU
		? userLabels.map(
				(label, index) => BORDER_COLORS[index % BORDER_COLORS.length]
		  )
		: null;

	const userDataset = {
		labels: userLabels,
		datasets: [
			{
				id: "User Dataset 1",
				label: "Total yearly expense by user",
				data: userData,
				borderColor: borderColorU,
				backgroundColor: backgroundColorU,
				borderWidth: 1,
			},
		],
	};

	const optionsU = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "User Expenses",
			},
            
		},
	};

	const handleChartTypeUser = (event) => {
		setChartTypeUser(event.target.value);
	};

	// Category data
	const [loadingC, dataC, statusC] = useApiCall("/api/expenses/by-category");
	const [chartTypeCategory, setChartTypeCategory] =
		React.useState("bar");
	const categoryLabels = !loadingC ? getLabels(dataC) : null;
	const categoryData = !loadingC ? getData(dataC) : null;
	const backgroundColorC = !loadingC
		? categoryLabels.map(
				(label, index) =>
					BACKGROUND_COLORS[index % BACKGROUND_COLORS.length]
		  )
		: null;
	const borderColorC = !loadingC
		? categoryLabels.map(
				(label, index) => BORDER_COLORS[index % BORDER_COLORS.length]
		  )
		: null;

	const categoryDataset = {
		labels: categoryLabels,
		datasets: [
			{
				id: "Category Dataset 1",
				label: "Total yearly expense",
				data: categoryData,
				borderColor: borderColorC,
				backgroundColor: backgroundColorC,
				borderWidth: 1,
			},
		],
	};

	const optionsC = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Category Expenses",
			},
		},
	};

	const handleChartTypeCategory = (event) => {
		setChartTypeCategory(event.target.value);
	};

	return (
		<Stack spacing={3}>
			<Typography />
			<Typography variant="h6" mb={3}>
				Monthly Expenses
			</Typography>
			<Divider sx={{ m: 3 }} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "60%",
					border: "1px solid black",
					borderRadius: "5px",
					mb: 3,
					p: 3,
					spacing: 3,
				}}
			>
				<FormControl fullWidth mb={3}>
					<InputLabel id="chart-type-month">Chart Type</InputLabel>
					<Select
						labelId="chart-type-month"
						id="chart-type-month"
						value={chartTypeMonth}
						label="ChartTypeMonth"
						onChange={handleChartTypeMonth}
					>
						<MenuItem value="line">Line</MenuItem>
						<MenuItem value="bar">Bar</MenuItem>
						{/* <MenuItem value="pie">Pie</MenuItem> */}
					</Select>
				</FormControl>
				{chartTypeMonth === "line" && (
					<Line options={optionsM} data={monthlyDataset} />
				)}
				{chartTypeMonth === "bar" && (
					<Bar options={optionsM} data={monthlyDataset} />
				)}
				{chartTypeMonth === "pie" && (
					<Pie options={optionsM} data={monthlyDataset} />
				)}
			</Box>
			<Typography />
			<Typography variant="h6" mb={3}>
				Yearly Expenses
			</Typography>
			<Divider sx={{ m: 3 }} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "60%",
					border: "1px solid black",
					borderRadius: "5px",
					mb: 3,
					p: 3,
					spacing: 3,
				}}
			>
				<FormControl fullWidth mb={3}>
					<InputLabel id="chart-type-yearly">Chart Type</InputLabel>
					<Select
						labelId="chart-type-yearly"
						id="chart-type-yearly"
						value={chartTypeYear}
						label="ChartTypeYear"
						onChange={handleChartTypeYear}
					>
						<MenuItem value="line">Line</MenuItem>
						<MenuItem value="bar">Bar</MenuItem>
						{/* <MenuItem value="pie">Pie</MenuItem> */}
					</Select>
				</FormControl>
				{chartTypeYear === "line" && (
					<Line options={optionsY} data={yearlyDataset} />
				)}
				{chartTypeYear === "bar" && (
					<Bar options={optionsY} data={yearlyDataset} />
				)}
				{chartTypeYear === "pie" && (
					<Pie options={optionsY} data={yearlyDataset} />
				)}
			</Box>
			<Typography />
			<Typography variant="h6" mt={3}>
				User Expenses
			</Typography>
			<Divider sx={{ m: 3 }} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "60%",
					border: "1px solid black",
					borderRadius: "5px",
					mb: 3,
					p: 3,
					spacing: 3,
				}}
			>
				<FormControl fullWidth mb={3}>
					<InputLabel id="chart-type-user">Chart Type</InputLabel>
					<Select
						labelId="chart-type-user"
						id="chart-type-user"
						value={chartTypeUser}
						label="ChartTypeUser"
						onChange={handleChartTypeUser}
					>
						<MenuItem value="line">Line</MenuItem>
						<MenuItem value="bar">Bar</MenuItem>
						<MenuItem value="doughnut">Doughnut</MenuItem>
					</Select>
				</FormControl>
				{chartTypeUser === "line" && (
					<Line options={optionsU} data={userDataset} />
				)}
				{chartTypeUser === "bar" && (
					<Bar options={optionsU} data={userDataset} />
				)}
				{chartTypeUser === "doughnut" && (
					<Doughnut options={optionsU} data={userDataset} />
				)}
			</Box>
			<Typography />
			<Typography variant="h6" mt={3}>
				Category Expenses
			</Typography>
			<Divider sx={{ m: 3 }} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "60%",
					border: "1px solid black",
					borderRadius: "5px",
					mb: 3,
					p: 3,
					spacing: 3,
				}}
			>
				<FormControl fullWidth mb={3}>
					<InputLabel id="chart-type-category">Chart Type</InputLabel>
					<Select
						labelId="chart-type-category"
						id="chart-type-category"
						value={chartTypeCategory}
						label="ChartTypeCategory"
						onChange={handleChartTypeCategory}
					>
						<MenuItem value="line">Line</MenuItem>
						<MenuItem value="bar">Bar</MenuItem>
						<MenuItem value="doughnut">Doughnut</MenuItem>
					</Select>
				</FormControl>
				{chartTypeCategory === "line" && (
					<Line options={optionsC} data={categoryDataset} />
				)}
				{chartTypeCategory === "bar" && (
					<Bar options={optionsC} data={categoryDataset} />
				)}
				{chartTypeCategory === "doughnut" && (
					<Doughnut options={optionsC} data={categoryDataset} />
				)}
			</Box>
		</Stack>
	);
}

export default Dashboard;

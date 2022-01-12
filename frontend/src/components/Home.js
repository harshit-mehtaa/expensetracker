import React from "react";
// Custom imports
import { EXPENSE_COLUMNS_TO_VIEW } from "../CONSTANTS";
import {getFormatedDate} from "./utils";
import useApiCall from "../hooks/useApiCall";
import Loading from "./Loading";
import DataCard from "./DataCard";
import SnackbarAlert from "./SnackbarAlert";


function Home() {
    const startDateString = getFormatedDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const endDateString = getFormatedDate(new Date(new Date().getFullYear(), new Date().getMonth() +1 , 0));
	const [loading, expenses, status] = useApiCall(`/api/expenses/?date_min=${startDateString}&date_max=${endDateString}`);
	const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

	const expensesTableColumns = EXPENSE_COLUMNS_TO_VIEW.map((column) => ({
		field: column,
		headerName: capitalize(column),
		editable: true,
		sortable: true,
		flex: 1,
	}));

    // console.log("expenses:", expenses);

	return (
		<>
			{loading ? (
				<Loading open={loading} />
			) : status !== undefined ? (
				<DataCard
					title="Expenses"
					columns={expensesTableColumns}
					rows={expenses}
					editMode="rows"
				/>
			) : (
				<SnackbarAlert severity="error" message="No data found" />
			)}
		</>
	);
}

export default Home;

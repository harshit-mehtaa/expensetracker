import { ContentCopySharp } from "@mui/icons-material";
import { cardHeaderClasses } from "@mui/material";
import { useState, useEffect, useContext } from "react";
// custom imports
import { GlobalContext } from "../App";
import { fetchUser } from "../components/utils";

function useApiCall(endpoint, method, body, headers) {
	const [global, setGlobal] = useContext(GlobalContext);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [status, setStatus] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!endpoint) {
				return;
			}
			try {
				let useMethod = method || "GET";
				let token = localStorage.getItem("token")
					? JSON.parse(localStorage.getItem("token"))
					: global.auth.token;
				const response = await fetch(endpoint, {
					method: useMethod,
					body: body,
					headers: {
						...headers,
						"Content-Type": "application/json",
						Authorization: `Token ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);
				}
				let actualData = await response.json();

				if (endpoint.startsWith("/api/expenses/?date_min=") && useMethod === "GET") {
					await actualData.forEach(async (expense) => {
						const user = await fetchUser(
							`/api/users/${expense.user}`
						);
						expense.user = user.name;
					});
				}

				// console.log("useApiCall - actualData:", actualData);

				setData(actualData);
				setStatus(response.status);
			} catch (error) {
				setStatus(error.message);
				setData(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [endpoint, method, body, headers]);

	return [loading, data, status];
}

export default useApiCall;

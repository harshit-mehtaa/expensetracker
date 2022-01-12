export const fetchAndGetLists = async (endpoint) => {
	let fetchedDataList = [];
	try {
		const response = await fetch(endpoint, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${JSON.parse(
					localStorage.getItem("token")
				)}`,
			},
		});
		if (!response.ok) {
			throw new Error(
				`This is an HTTP error: The status is ${response.status}`
			);
		}
		const data = await response.json();
		fetchedDataList = data.map((key, index) => ({
			name: key,
			id: index,
		}));
	} catch (error) {
		console.log("fetchAndGetLists - error:", error);
        return null;
	}
	return fetchedDataList;
};

export const fetchUser = async (endpoint) => {
	let fetchedUser = {};
	try {
		const response = await fetch(endpoint, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${JSON.parse(
					localStorage.getItem("token")
				)}`,
			},
		});
		if (!response.ok) {
			throw new Error(
				`This is an HTTP error: The status is ${response.status}`
			);
		}
		fetchedUser = await response.json();
	} catch (error) {
        console.log("fetchUser - error:", error);
		return null;
	}
	fetchedUser = Array.isArray(fetchedUser) ? fetchedUser[0] : fetchedUser;
	return fetchedUser;
};

export function titleCase(str) {
	var splitStr = str.toLowerCase().split(" ");
	for (var i = 0; i < splitStr.length; i++) {
		// You do not need to check if i is larger than splitStr length, as your for does that for you
		// Assign it back to the array
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	// Directly return the joined string
	return splitStr.join(" ");
}


export const getFormatedDate = (date) => {
    return date.toLocaleDateString("en-GB").split("/").reverse().join("-");
}
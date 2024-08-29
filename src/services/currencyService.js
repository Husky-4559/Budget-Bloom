import axios from "axios";

const API_URL = "https://openexchangerates.org/api/latest.json";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCurrencyRates = async () => {
	try {
		// Check if API_KEY is present
		if (!API_KEY) {
			throw new Error(
				"API key is missing. Please check your environment variables."
			);
		}

		const response = await axios.get(API_URL, {
			params: {
				app_id: API_KEY,
			},
			timeout: 5000, // Set a 5-second timeout for the request
		});

		// Check if response contains the expected data
		if (response.status !== 200 || !response.data.rates) {
			throw new Error("Invalid response from the currency API.");
		}

		return response.data.rates;
	} catch (error) {
		// Improved error handling
		if (error.code === "ECONNABORTED") {
			console.error("Request timed out. Please try again later.");
		} else if (error.response) {
			console.error(
				`API Error: ${error.response.status} - ${error.response.statusText}`
			);
		} else {
			console.error("Error fetching currency rates:", error.message || error);
		}

		// Return a fallback value or rethrow the error
		throw error;
	}
};

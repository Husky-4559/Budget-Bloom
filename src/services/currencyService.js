import axios from "axios";

const API_URL = "https://openexchangerates.org/api/latest.json";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCurrencyRates = async () => {
	try {
		const response = await axios.get(API_URL, {
			params: {
				app_id: API_KEY,
			},
		});
		return response.data.rates;
	} catch (error) {
		console.error("Error fetching currency rates:", error);
		throw error;
	}
};

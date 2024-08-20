// react router dom exports
import { useLoaderData } from "react-router-dom";

// helpers import
import { deleteItem, fetchData, convertCurrency } from "../helpers";

// component import
import Table from "../components/Table";

// react toast import
import { toast } from "react-toastify";

// services
import { fetchCurrencyRates } from "../services/currencyService";
import { useState, useEffect } from "react";
import { currencyData } from "../services/currencyData"; // Assuming you have a currencyData file

// loader
export async function expensesLoader() {
	const expenses = await fetchData("expenses");
	return { expenses };
}

// action
export async function expensesAction({ request }) {
	const data = await request.formData();
	const { _action, ...values } = Object.fromEntries(data);

	if (_action === "deleteExpense") {
		try {
			deleteItem({
				key: "expenses",
				id: values.expenseId,
			});
			return toast.success("Expense deleted!");
		} catch (e) {
			throw new Error("There was a problem deleting your expense.");
		}
	}
}

const ExpensesPage = () => {
	const { expenses } = useLoaderData();
	const [selectedCurrency, setSelectedCurrency] = useState("USD");
	const [currencyRates, setCurrencyRates] = useState({});
	const [convertedExpenses, setConvertedExpenses] = useState(expenses);

	useEffect(() => {
		const fetchRates = async () => {
			const rates = await fetchCurrencyRates();
			setCurrencyRates(rates);
		};

		fetchRates();
	}, []);

	useEffect(() => {
		const convertExpenses = () => {
			const updatedExpenses = expenses.map((expense) => {
				const convertedAmount = convertCurrency(
					expense.amount,
					expense.currency,
					selectedCurrency,
					currencyRates
				);
				return {
					...expense,
					amount: convertedAmount,
					displayCurrency: selectedCurrency,
				};
			});
			setConvertedExpenses(updatedExpenses);
		};

		convertExpenses();
	}, [selectedCurrency, currencyRates, expenses]);

	return (
		<div className="grid-lg">
			<h1>All Expenses</h1>
			<div className="grid-xs">
				<label htmlFor="currency">View in Currency:</label>
				<select
					name="currency"
					id="currency"
					value={selectedCurrency}
					onChange={(e) => setSelectedCurrency(e.target.value)}
				>
					{Object.keys(currencyData).map((key) => (
						<option key={key} value={key}>
							{currencyData[key]} ({key})
						</option>
					))}
				</select>
			</div>
			{convertedExpenses && convertedExpenses.length > 0 ? (
				<div className="grid-md">
					<h2>
						Recent Expenses <small>({convertedExpenses.length} total)</small>
					</h2>
					<Table expenses={convertedExpenses} currency={selectedCurrency} />
				</div>
			) : (
				<p>No Expenses To Show</p>
			)}
		</div>
	);
};

export default ExpensesPage;

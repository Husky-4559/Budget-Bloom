import React, { useState } from "react";
import { useFetcher } from "react-router-dom";
import CurrencyConverter from "./CurrencyConverter";

const AddExpenseForm = ({ budgets }) => {
	const fetcher = useFetcher();
	const isSubmitting = fetcher.state === "submitting";
	const [convertedAmount, setConvertedAmount] = useState("");
	const [currency, setCurrency] = useState("USD");

	const handleConvert = (amount, currency) => {
		setConvertedAmount(amount);
		setCurrency(currency);
	};

	return (
		<div className="form-wrapper">
			<h2 className="h3">Add Expense</h2>
			<fetcher.Form method="post" className="grid-sm">
				<div className="grid-xs">
					<label htmlFor="newExpense">Expense Name</label>
					<input
						type="text"
						name="newExpense"
						id="newExpense"
						placeholder="e.g., Coffee"
						required
					/>
				</div>
				{/* Currency Converter moved here */}
				<CurrencyConverter onConvert={handleConvert} />
				<div className="grid-xs">
					<label htmlFor="newExpenseAmount">Amount</label>
					<input
						type="number"
						step="0.01"
						name="newExpenseAmount"
						id="newExpenseAmount"
						value={convertedAmount}
						placeholder="e.g., $5"
						required
						inputMode="decimal"
					/>
					<input type="hidden" name="currency" value={currency} />
				</div>
				<div className="grid-xs">
					<label htmlFor="newExpenseBudget">Assign to Budget</label>
					<select name="newExpenseBudget" id="newExpenseBudget" required>
						{budgets.map((budget) => (
							<option key={budget.id} value={budget.id}>
								{budget.name}
							</option>
						))}
					</select>
				</div>
				<input type="hidden" name="_action" value="createExpense" />
				<button type="submit" className="btn btn--dark" disabled={isSubmitting}>
					{isSubmitting ? <span>Submitting...</span> : <span>Add Expense</span>}
				</button>
			</fetcher.Form>
		</div>
	);
};

export default AddExpenseForm;

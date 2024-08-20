import React, { useState } from "react";
import { useFetcher } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import CurrencyConverter from "./CurrencyConverter";

const AddBudgetForm = () => {
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
			<h2 className="h3">Create Budget</h2>
			<fetcher.Form method="post" className="grid-sm">
				<div className="grid-xs">
					<label htmlFor="newBudget">Budget Name</label>
					<input
						type="text"
						name="newBudget"
						id="newBudget"
						placeholder="e.g., Groceries"
						required
					/>
				</div>
				{/* Currency Converter moved here */}
				<CurrencyConverter onConvert={handleConvert} />
				<div className="grid-xs">
					<label htmlFor="newBudgetAmount">Amount</label>
					<input
						type="number"
						step="0.01"
						name="newBudgetAmount"
						id="newBudgetAmount"
						value={convertedAmount}
						placeholder="e.g., $350"
						required
						inputMode="decimal"
					/>
					<input type="hidden" name="currency" value={currency} />
				</div>
				<input type="hidden" name="_action" value="createBudget" />
				<button type="submit" className="btn btn--dark" disabled={isSubmitting}>
					{isSubmitting ? (
						<span>Submitting...</span>
					) : (
						<>
							<span>Create Budget</span>
							<CurrencyDollarIcon width={20} />
						</>
					)}
				</button>
			</fetcher.Form>
		</div>
	);
};

export default AddBudgetForm;

// rrd imports
import { Form, Link } from "react-router-dom";

// library imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

// helper functions
import {
	calculateSpentByBudget,
	formatCurrency,
	formatPercentage,
	convertCurrency,
} from "../helpers";

const BudgetItem = ({
	budget,
	showDelete = false,
	currencyRates,
	selectedCurrency,
}) => {
	const { id, name, amount, color, currency } = budget;
	const spent = calculateSpentByBudget(id);

	// Convert budget amount and spent amount to selected currency
	const convertedAmount = convertCurrency(
		amount,
		currency,
		selectedCurrency,
		currencyRates
	);
	const convertedSpent = convertCurrency(
		spent,
		currency,
		selectedCurrency,
		currencyRates
	);

	return (
		<div
			className="budget"
			style={{
				"--accent": color,
			}}
		>
			<div className="progress-text">
				<h3>{name}</h3>
				<p>{formatCurrency(convertedAmount, selectedCurrency)} Budgeted</p>
			</div>
			<progress max={amount} value={spent}>
				{formatPercentage(spent / amount)}
			</progress>
			<div className="progress-text">
				<small>{formatCurrency(convertedSpent, selectedCurrency)} spent</small>
				<small>
					{formatCurrency(convertedAmount - convertedSpent, selectedCurrency)}{" "}
					remaining
				</small>
			</div>
			{showDelete ? (
				<div className="flex-sm">
					<Form
						method="post"
						action="delete"
						onSubmit={(event) => {
							if (
								!confirm(
									"Are you sure you want to permanently delete this budget?"
								)
							) {
								event.preventDefault();
							}
						}}
					>
						<button type="submit" className="btn">
							<span>Delete Budget</span>
							<TrashIcon width={20} />
						</button>
					</Form>
				</div>
			) : (
				<div className="flex-sm">
					<Link to={`/budget/${id}`} className="btn">
						<span>View Details</span>
						<BanknotesIcon width={20} />
					</Link>
				</div>
			)}
		</div>
	);
};

export default BudgetItem;

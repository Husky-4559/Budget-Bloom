// react-router-dom import
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({ params }) {
	try {
		// Delete the budget
		deleteItem({
			key: "budgets",
			id: params.id,
		});

		// Find and delete all associated expenses
		const associatedExpenses = getAllMatchingItems({
			category: "expenses",
			key: "budgetId",
			value: params.id,
		});

		associatedExpenses.forEach((expense) => {
			deleteItem({
				key: "expenses",
				id: expense.id,
			});
		});

		// Notify the user of a successful deletion
		toast.success("Budget and associated expenses deleted successfully!");
	} catch (e) {
		console.error("Error deleting budget:", e);
		toast.error("There was a problem deleting your budget.");
	}

	// Redirect to the homepage
	return redirect("/");
}

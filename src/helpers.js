export const waait = () =>
	new Promise((res) => setTimeout(res, Math.random() * 800));

const generateRandomColor = () => {
	const existingBudgetLength = fetchData("budgets")?.length ?? 0;
	return `${existingBudgetLength * 34} 65% 50%`;
};

// Local storage functions
export const fetchData = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
	const data = fetchData(category) ?? [];
	return data.filter((item) => item[key] === value);
};

// Delete item from local storage
export const deleteItem = ({ key, id }) => {
	const existingData = fetchData(key);
	if (id) {
		const newData = existingData.filter((item) => item.id !== id);
		return localStorage.setItem(key, JSON.stringify(newData));
	}
	return localStorage.removeItem(key);
};

// Create budget with currency support
export const createBudget = ({ name, amount, currency = "USD" }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
		currency: currency, // Store the selected currency
		color: generateRandomColor(),
	};
	const existingBudgets = fetchData("budgets") ?? [];
	return localStorage.setItem(
		"budgets",
		JSON.stringify([...existingBudgets, newItem])
	);
};

// Create expense with currency support
export const createExpense = ({ name, amount, budgetId, currency = "USD" }) => {
	const newItem = {
		id: crypto.randomUUID(),
		name: name,
		createdAt: Date.now(),
		amount: +amount,
		budgetId: budgetId,
		currency: currency, // Store the currency used for the expense
	};
	const existingExpenses = fetchData("expenses") ?? [];
	return localStorage.setItem(
		"expenses",
		JSON.stringify([...existingExpenses, newItem])
	);
};

// Total spent by budget in original currency
export const calculateSpentByBudget = (budgetId) => {
	const expenses = fetchData("expenses") ?? [];
	const budgetSpent = expenses.reduce((acc, expense) => {
		// Check if expense.id === budgetId passed in
		if (expense.budgetId !== budgetId) return acc;

		// Add the current amount to total
		return (acc += expense.amount);
	}, 0);
	return budgetSpent;
};

// Format date to locale string
export const formatDateToLocaleString = (epoch) =>
	new Date(epoch).toLocaleString();

// Formatting percentages
export const formatPercentage = (amt) => {
	return amt.toLocaleString(undefined, {
		style: "percent",
		minimumFractionDigits: 0,
	});
};

// Format currency with support for different currencies
export const formatCurrency = (amt, currency = "USD") => {
	return amt.toLocaleString(undefined, {
		style: "currency",
		currency: currency,
	});
};

// Convert currency from one to another using exchange rates
export const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
	if (fromCurrency === toCurrency) return amount;
	const conversionRate = rates[toCurrency] / rates[fromCurrency];
	return amount * conversionRate;
};

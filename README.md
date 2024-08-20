# Budget Bloom

Welcome to the Budget Bloom Application! This tool is designed to help you manage your finances by creating budgets and tracking expenses.

## Why I Built This Application

In recent years, particularly following the COVID-19 pandemic, the world has seen a dramatic increase in the cost of living. The prices of goods and services have soared, placing financial strain on individuals and families across the globe. As inflation continues to rise, budgeting has become an essential skill for managing personal finances effectively.

I built Budget Bloom to empower users from all over the world to take control of their finances amidst these challenging economic times. This application allows users to create and manage their budgets in various currencies, providing flexibility and adaptability in an increasingly globalized economy. With Budget Bloom, users can track their spending, plan for the future, and make informed financial decisions, no matter where they are in the world.

## Features

- **User Authentication**: Welcome new users and greet returning users by name.
- **Budget Management**: Create and manage multiple budgets.
- **Expense Tracking**: Add and categorize expenses under specific budgets.
- **View Expenses**: View a table of recent expenses, with an option to see all expenses.
- **Multi-Currency Support**: Manage budgets in different currencies, enabling global accessibility.

## Installation

To get started with the application, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Husky-4559/Budget-Bloom.git
   ```

2. **Navigate to the project directory**: cd Budget-Bloom

3. **Install dependencies**: npm install

4. **Run the application**: npm run dev

# Usage

## Dashboard

### When you first access the application, you’ll be greeted with a welcome message.

    •	New Users: Enter your name to create a new account.
    •	Returning Users: Your name will be displayed, and you can start managing your budgets and expenses.

### Adding a Budget

    •	Click on the “Add Budget” form.
    •	Enter the name of the budget and the total amount allocated for that budget.
    •	Click “Create Budget” to save.

### Adding an Expense

    •	Click on the “Add Expense” form.
    •	Select the budget under which the expense falls.
    •	Enter the name and amount of the expense.
    •	Click “Create Expense” to save.

### Viewing and Managing Budgets and Expenses

    •	Existing Budgets: All your budgets are listed. You can view details of each budget.
    •	Recent Expenses: A table of recent expenses is shown. Click “View all expenses” to see a full list.

# Code Structure

## Components

    •	Intro: A welcome screen for new users.
    •	AddBudgetForm: A form to add new budgets.
    •	AddExpenseForm: A form to add new expenses.
    •	BudgetItem: A component to display individual budgets.
    •	Table: A component to display expenses in a tabular format.

## Helpers

- **createBudget** : A function that creates a new budget, stores it in localStorage, and assigns it a unique ID and creation timestamp.
- **createExpense**: A function that creates a new expense under a specific budget, stores it in localStorage, and assigns it a unique ID and creation timestamp.
- **deleteItem**: A function that deletes a specified item (either a budget or an expense) from localStorage.
- **fetchData**: A function that retrieves data from localStorage, given a specific key.
- **getAllMatchingItems**: A function that retrieves all items from localStorage that match a specified key-value pair, used for fetching budgets and expenses.
- **convertCurrency**: A function that converts amounts between different currencies based on the provided exchange rates.
- **formatCurrency**: A function that formats numbers as currency values according to the selected currency.
- **formatPercentage**: A function that formats a number as a percentage, used for displaying budget usage.
- **waait**: A utility function that introduces a delay, used for simulating network latency during demo purposes.

## Loader

- **dashboardLoader**: A function that loads user data, including the user’s name, budgets, and expenses, from localStorage to be displayed on the dashboard.
- **budgetLoader**: A function that loads a specific budget and its associated expenses based on the budget’s ID, used to display detailed budget information.

## Actions

- **dashboardAction**: Handles user actions on the dashboard, such as creating a new user, creating a new budget, or adding a new expense.
- **budgetAction**: Handles actions specific to the budget page, including adding new expenses to a budget and deleting existing expenses.

## Technologies Used

- **React**: A JavaScript library for building user interfaces. Used to create the components and manage the application state.
- **React Router**: A library for handling routing in React applications. It manages the navigation between different pages of the application, such as the dashboard and budget details.
- **React Toastify**: A library for displaying toast notifications. Used to provide feedback to users when they create budgets, add expenses, or delete items.
- **Vite**: A fast build tool and development server for modern web projects. Used to serve the development environment and build the production version of the app.
- **Local Storage**: The browser’s local storage API is used to store user data, budgets, and expenses persistently on the user’s device.
- **JavaScript (ES6+)** : The programming language used to build the application’s logic and handle data manipulation.
- **HTML5/CSS3**: Standard web technologies used to structure and style the application.

## License

This project is licensed under the MIT License.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

    •	@vitejs/plugin-react uses Babel for Fast Refresh.
    •	@vitejs/plugin-react-swc uses SWC for Fast Refresh.

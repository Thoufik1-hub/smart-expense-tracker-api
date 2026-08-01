const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../expenses.json");

// Read expenses
const readExpenses = () => {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
};

// Write expenses
const writeExpenses = (expenses) => {
    fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
};

// GET all
exports.getExpenses = (req, res) => {
    res.json(readExpenses());
};

// GET by ID
exports.getExpenseById = (req, res) => {
    const expenses = readExpenses();
    const expense = expenses.find(e => e.id == req.params.id);

    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);
};

// POST
exports.addExpense = (req, res) => {
    const expenses = readExpenses();

    const newExpense = {
        id: Date.now(),
        ...req.body
    };

    expenses.push(newExpense);
    writeExpenses(expenses);

    res.status(201).json({
        message: "Expense added successfully",
        expense: newExpense
    });
};

// PUT
exports.updateExpense = (req, res) => {
    const expenses = readExpenses();

    const index = expenses.findIndex(e => e.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Expense not found" });
    }

    expenses[index] = {
        ...expenses[index],
        ...req.body
    };

    writeExpenses(expenses);

    res.json({
        message: "Expense updated successfully",
        expense: expenses[index]
    });
};

// DELETE
exports.deleteExpense = (req, res) => {
    const expenses = readExpenses();

    const filtered = expenses.filter(e => e.id != req.params.id);

    if (filtered.length === expenses.length) {
        return res.status(404).json({ message: "Expense not found" });
    }

    writeExpenses(filtered);

    res.json({
        message: "Expense deleted successfully"
    });
};
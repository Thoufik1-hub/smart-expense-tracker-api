const express = require("express");
const router = express.Router();

const {
    getExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController");

// Get all expenses
router.get("/", getExpenses);

// Get expense by ID
router.get("/:id", getExpenseById);

// Add new expense
router.post("/", addExpense);

// Update expense
router.put("/:id", updateExpense);

// Delete expense
router.delete("/:id", deleteExpense);

module.exports = router;
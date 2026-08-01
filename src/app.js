const express = require("express");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Smart Expense Tracker API is Running...");
});

app.use("/api/expenses", expenseRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const expenseModel = require("../models/ExpenseModel")

const createExpense = async (req, res) => {
    try {

        const userId = req.user._id
        const savedExpense = await expenseModel.create({ ...req.body, userId: userId })
        res.status(201).json({
            message: "Expense created successfully",
            data: savedExpense
        })
    } catch (err) {
        res.status(500).json({
            message: "Error while creating expense",
            err: err
        })
    }
}

const getExpesneByUserId = async (req, res) => {

    try {

        const userId = req.user._id
        const expenses = await expenseModel.find({ userId: userId })
        res.status(200).json({
            message: "Expenses fetched successfully",
            data: expenses
        })
    } catch (err) {
        res.status(500).json({
            message: "Error while fetching expenses",
            err: err
        })
    }
}

module.exports = {
    createExpense,
    getExpesneByUserId
    
}
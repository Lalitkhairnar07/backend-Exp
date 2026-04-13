const router = require("express").Router()
const expenseController = require("../controllers/ExpenseController")
const authMiddleware = require("../middlewares/AuthMiddleware")

router.post("/create",authMiddleware,expenseController.createExpense)
router.get("/get",authMiddleware,expenseController.getExpesneByUserId)

module.exports = router

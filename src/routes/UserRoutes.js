const router = require("express").Router()
const userController = require("../controllers/UserController")
const authMiddleware = require("../middleware/AuthMiddleware")

router.get("/", userController.getAllUsers)
router.post("/signup", userController.createUser)
router.delete("/:id", userController.deleteUser)

router.post("/login", userController.loginUser)
router.get("/me",authMiddleware,userController.getUserById)

module.exports = router

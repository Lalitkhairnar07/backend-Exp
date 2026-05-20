const router = require("express").Router()
const userController = require("../controllers/UserController")
const authMiddleware = require("../middleware/AuthMiddleware")
const upload = require("../middleware/UploadMiddleware")

router.get("/", userController.getAllUsers)
router.post("/signup", userController.createUser)
router.delete("/:id", userController.deleteUser)

router.post("/login", userController.loginUser)
router.get("/me",authMiddleware,userController.getUserById)

router.put("/profilePic",authMiddleware,upload.single("image"),userController.uploadProfilePic)

module.exports = router

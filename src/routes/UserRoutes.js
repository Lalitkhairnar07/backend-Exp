const router  = require("express").Router()
const userController = require("../controllers/UserController")

router.get("/",userController.getAllUsers)
router.post("/",userController.createUser)
router.delete("/:id",userController.deleteUser)

// router.post("/login",userController.loginUser)

module.exports = router
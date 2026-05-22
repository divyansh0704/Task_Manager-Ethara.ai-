const express = require("express");
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")
const {registerUser,loginUser,getUserById,logoutUser,getAllUser} = require("../controllers/authControllers")

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/me",authMiddleware,getUserById)
router.get("/logout",authMiddleware,logoutUser)
router.get("/alluser",authMiddleware,getAllUser)

module.exports = router
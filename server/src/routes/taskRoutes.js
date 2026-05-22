const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")
const {authorize} = require("../middlewares/roleMiddleware")
const {createTask,getTasks,getTask,updateTask,deleteTask} = require("../controllers/taskController")


router.post("/", authMiddleware, authorize("admin"), createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, authorize("admin"), deleteTask);

module.exports = router
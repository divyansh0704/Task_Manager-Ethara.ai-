const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")
const {authorize} = require("../middlewares/roleMiddleware")
const {createProject,getProject,getProjects,updateProject,deleteProject,addMember} = require("../controllers/projectController")


router.post("/create", authMiddleware, authorize("admin"), createProject);
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProject);
router.put("/:id", authMiddleware, authorize("admin"), updateProject);
router.delete("/:id", authMiddleware, authorize("admin"), deleteProject);
router.post("/:id/members", authMiddleware, authorize("admin"), addMember);

module.exports = router
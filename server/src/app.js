const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors(
    {
        origin:["http://localhost:5173", "https://taskmanager-etharaai-production.up.railway.app"],
        credentials:true
    }
))



//require all routes here
const authRoutes = require("./routes/authRoutes")
const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoutes")

// using all routes here
app.use("/api/auth",authRoutes)
app.use("/api/project",projectRoutes)
app.use("/api/task",taskRoutes)

module.exports=app;
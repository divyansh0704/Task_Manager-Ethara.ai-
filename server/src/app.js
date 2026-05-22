const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
// app.use(cors(
//     {
//         origin: ["http://localhost:5173"],
//         credentials: true,
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//         allowedHeaders: ['Content-Type', 'Authorization']
//     }
// ))
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    // Manually pass the proper headers out on preflight checks
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());




//require all routes here
const authRoutes = require("./routes/authRoutes")
const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoutes")

// using all routes here
app.use("/api/auth", authRoutes)
app.use("/api/project", projectRoutes)
app.use("/api/task", taskRoutes)

module.exports = app;
require("dotenv").config()
const connectDB = require("./src/config/db")
const app = require("./src/app")

const PORT = process.env.PORT || 3000
connectDB();

app.listen(PORT,()=>{
    console.log(`server is running on PORT : ${PORT}`)
})
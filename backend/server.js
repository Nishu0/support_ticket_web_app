const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const PORT = process.env.PORT || 8000
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const path = require("path")

//Connect to database

const app=express()
dotenv.config({path:'config.env'})
app.use(express.json());
connectDB();
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"))

//Serve frontend
if (process.env.NODE_ENV === "production") {
  //Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (_, res) => res.sendFile(__dirname, "../frontend/build/index.html"))
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Nisarg Support API" })
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

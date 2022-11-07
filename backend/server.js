//packages
const path = require("path");
const dotenv = require("dotenv").config();
const express = require("express");
const colors = require("colors");

const cors = require("cors");

const connectDB = require("./config/db");

const { errorHandler } = require("./middleware/errorMiddleware");

// the port that the backend server listens on
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandler);

//starting the server
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

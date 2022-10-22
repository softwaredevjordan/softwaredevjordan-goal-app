const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

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
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

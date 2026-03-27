const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ CORS middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

// DB connection
require("./config/db")();
require("./models");

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require("./routes");
app.use("/api", routes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = app;
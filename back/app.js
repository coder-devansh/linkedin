const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config(); // Fixed: Call the config() function

const _dirname = path.resolve();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Setup
app.use(
  cors({
    origin: "https://linkedin-3jua.vercel.app", // Your frontend domain
    credentials: true, // Allow cookies / credentials
  })
);

// Routes setup
const companyRouter = require("./Router/CompanyRouter");
const jobRouter = require("./Router/jobRouter");
const userRouter = require("./Router/userRouter");
const applicationRouter = require("./Router/ApplicationRouter");

app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/job", jobRouter);
app.use("/application", applicationRouter);

// Serve static files
app.use(express.static(path.join(_dirname, "/frontend/dist"))); // Fixed path typo ("frontened" → "frontend")

// Catch-all route for SPA (Single Page Application)
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

module.exports = app;

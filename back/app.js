const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const _dirname = path.resolve();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Setup
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all origins in development (for production, list allowed domains)
      callback(null, true);
    },
    credentials: true, // allow cookies (if frontend sends withCredentials: true)
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
app.use(express.static(path.join(_dirname, "/frontend/frontend/dist"))); // fixed "frontened"

// Catch-all route for SPA (Single Page Application)
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend/frontend", "dist", "index.html"));
});

module.exports = app;

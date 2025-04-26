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
    origin: "*", // allow ANY origin
    // only if you are sending cookies
  })
);


// Remove manual OPTIONS handler (cors package automatically handles preflight requests)

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
app.use(express.static(path.join(_dirname, "/frontened/frontend/dist"))); // Fix "frontened" typo

// Catch-all route
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontened/frontend", "dist", "index.html"));
});


module.exports = app; 

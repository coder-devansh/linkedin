const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const companyRouter = require("./Router/CompanyRouter");
const path = require("path");

const _dirname = path.resolve();

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // global middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*", // allow all origins
    
  })
);


// Handle preflight OPTIONS request
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173","https://linkedin-3jua.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.sendStatus(204);  // No content
});

// Routes setup
const jobRouter = require("./Router/jobRouter");
const userRouter = require("./Router/userRouter");
const applicationRouter = require("./Router/ApplicationRouter");

app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/job", jobRouter);
app.use("/application", applicationRouter);

// Serve static files
app.use(express.static(path.join(_dirname, "/frontened/frontend/dist")));

// Catch-all route for single-page applications (SPA)
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontened/frontend", "dist", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});

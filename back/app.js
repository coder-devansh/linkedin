const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

// CORS configuration to allow the frontend URL (https://linkedin-3jua.vercel.app)
const corsOptions = {
  origin: 'https://linkedin-3jua.vercel.app', // Allow only this frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow credentials (cookies or authorization tokens)
  Access-Control-Allow-Origin: https://linkedin-3jua.vercel.app,
Access-Control-Allow-Credentials: true,

};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware functions
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded requests
app.use(cookieParser());  // Cookie parser middleware

// Routes for different endpoints
const userRouter = require("./Router/userRouter");
const companyRouter = require("./Router/CompanyRouter");
const jobRouter = require("./Router/jobRouter");
const applicationRouter = require("./Router/ApplicationRouter");

app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/job", jobRouter);
app.use("/application", applicationRouter);

// Serve static files for frontend
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "frontend/frontend/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend/frontend", "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

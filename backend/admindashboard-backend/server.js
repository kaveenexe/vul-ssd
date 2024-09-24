require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();

// Import routes
const customerRoutes = require("./routes/customer");
const sellerRoutes = require("./routes/seller");
const settingsRoutes = require("./routes/settings");

// Middleware
const cors = require("cors");
app.use(cors());

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware to parse cookies

// Disable X-Powered-By header
app.disable("x-powered-by");

// Set up CSRF protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Expose CSRF token to all routes
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Routes
app.use("/customer", customerRoutes);
app.use("/seller", sellerRoutes);
app.use("/settings", settingsRoutes);

// Handle CSRF token errors
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    // CSRF token errors
    res.status(403).send("CSRF token validation failed");
  } else {
    // Other errors
    next(err);
  }
});

app.get("/", (req, res) => res.send("Server up and running"));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

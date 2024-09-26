require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();

// Import routes
const cart = require("./routes/cartRoute"); // added

const cors = require("cors");
app.use(cors());


app.disable("x-powered-by");  // added to fix Information Exposure vulnerability

connectDB();

// Initialize middleware
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

app.get("/", (req, res) => res.send("Server up and running"));

// Use routes

app.use("/api/cart", cart); // added

// Handle CSRF token errors
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    // CSRF token errors
    res.status(403).send("Form tampered with");
  } else {
    // Other errors
    next(err);
  }
});

// Setting up port
const PORT = process.env.PORT || 9010;

app.listen(PORT, () => {

    console.log(`server is running on http://localhost:${PORT}`);

});

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet"); // Add helmet for security headers
const app = express();
const sellerReview = require("./routes/sellerReviewRoute"); 
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const productReview = require("./routes/productReviewRoute");
const cors = require("cors");

app.use(cors());

// Connect to the database
connectDB();

// Add Helmet to set security-related HTTP headers, including CSP
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "trusted-scripts.example.com"],
                styleSrc: ["'self'", "https://trusted-styles.example.com"],
                imgSrc: ["'self'", "data:"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
    })
);



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

// Initialize middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Server up and running"));

app.use("/api/sellerReview", sellerReview); 
app.use("/api/productReview", productReview);

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
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

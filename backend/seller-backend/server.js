const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8003;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

// MongoDB connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB connection success
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection successful");
});

// Routes
const sellerRouter = require("./routes/sellerdets.js");
app.use("/products", sellerRouter);

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});

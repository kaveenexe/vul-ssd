import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import imageRoutes from "./routes/images.js";
import cors from "cors";
import csrf from "csurf";
import cookieParser from "cookie-parser";

const app = express();

// Load environment variables
config();
dbConnect();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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
app.use("/api", imageRoutes);

// Error handling for CSRF token errors
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    // CSRF token errors
    res.status(403).send("Form tampered with");
  } else {
    // Other errors
    next(err);
  }
});

const port = process.env.PORT || 9020;
app.listen(port, () => console.log(`Listening on port ${port}...`));

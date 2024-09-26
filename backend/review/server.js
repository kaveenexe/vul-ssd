require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet"); // Add helmet for security headers

const app = express();

const sellerReview = require("./routes/sellerReviewRoute"); 
const productReview = require("./routes/productReviewRoute");

var cors = require('cors')

app.use(cors())

// Connect database
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

app.get("/", (req, res) => res.send("Server up and running"));

app.use("/api/sellerReview", sellerReview); 
app.use("/api/productReview", productReview);

// Set up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// server.js
require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");

const app = express();

const sellerReview = require("./routes/sellerReviewRoute"); // added
const productReview = require("./routes/productReviewRoute"); // added

var cors = require('cors')

app.use(cors())

// connect database
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));


app.use("/api/sellerReview", sellerReview); // added
app.use("/api/productReview", productReview); // added

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
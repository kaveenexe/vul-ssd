require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();

const orderRoutes = require("./routes/order-route");

var cors = require("cors");
app.use(cors());

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

/* ROUTES */
app.use("/order", orderRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8010;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

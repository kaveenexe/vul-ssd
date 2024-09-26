const router = require("express").Router();
const rateLimit = require("express-rate-limit");
let User = require("../models/User");

// Apply rate limiting to protect from DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later."
});

// Apply rate limiting to all routes
router.use(limiter);

// Get all customers ({role: "customer"}) without ("-password") 
router.route("/getAllCustomers").get((req, res) => {
  User.find({ role: "customer" })
    .select("-password")
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create new customer
router.route("/addCustomer").post((req, res) => {
  const { name, email, phone, role, password, re_enter_pw } = req.body;

  const newCustomer = new User({
    name,
    email,
    phone,
    role,
    password,
    re_enter_pw,
  });

  newCustomer
    .save()
    .then(() => res.json("Customer added successfully..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Remove an existing registered customer
router.route("/removeCustomer/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Customer deleted successfully.."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

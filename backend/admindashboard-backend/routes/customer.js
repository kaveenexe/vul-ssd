const router = require("express").Router();
let User = require("../models/User");

//Get all customers ({role: "customer"}) without ("-password") 
router.route("/getAllCustomers").get((req, res) => {
  User.find({ role: "customer" })
    .select("-password")
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Create new customer
router.route("/addCustomer").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const role = req.body.role;
  const password = req.body.password;
  const re_enter_pw = req.body.re_enter_pw;

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
} );

//Remove an existing registered customer
router.route("/removeCustomer/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Customer deleted successfully.."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
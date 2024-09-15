const router = require("express").Router();
let User = require("../models/User");

//Get all sellers ({role: "seller"}) without ("-password")
router.route("/getAllSellers").get((req, res) => {
  User.find({ role: "seller" })
    .select("-password")
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Create new seller
router.route("/addSellers").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const role = req.body.role;
  const password = req.body.password;
  const re_enter_pw = req.body.re_enter_pw;

  const newSeller = new User({
    name,
    email,
    phone,
    role,
    password,
    re_enter_pw,
  });

  newSeller
    .save()
    .then(() => res.json("Seller added successfully..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Remove an existing registered seller
router.route("/removeSellers/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Seller deleted successfully.."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

const router = require("express").Router();
let User = require("../models/User");

//Get admin ({role: "admin"}) without ("-password")
router.route("/:id").get((req, res) => {
  User.findById(req.params.id) &&
    { role: "admin" }
      .then((User) => res.json(User))
      .catch((err) => res.status(400).json("Error: " + err));
});

//Create the admin
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const role = req.body.role;
  const password = req.body.password;
  const re_enter_pw = req.body.re_enter_pw;

  const newAdmin = new User({
    name,
    email,
    phone,
    role,
    password,
    re_enter_pw,
  });

  newAdmin
    .save()
    .then(() => res.json("Admin added successfully..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Remove an existing registered admin
router.route("/remove/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Admin deleted successfully.."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.get("/:id", verifyAdmin, (req, res) => {
  User.findById(req.params.id)
    .select("-password -re_enter_pw") // Exclude password fields
    .then((user) => {
      if (user.role !== "admin") {
        return res.status(403).json("Access denied. Not authorized.");
      }
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", verifyAdmin, (req, res) => {
  const { name, email, phone, password, re_enter_pw } = req.body;

  const newAdmin = new User({
    name,
    email,
    phone,
    role: "admin", // Set role to admin
    password,
    re_enter_pw,
  });

  newAdmin
    .save()
    .then(() => res.json("Admin added successfully..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/remove/:id", verifyAdmin, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Admin deleted successfully..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

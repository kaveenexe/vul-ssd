const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      max: 10,
      min: 10,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "seller"],
      default: "customer",
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    re_enter_pw: {
      type: String,
      required: true,
      min: 5,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", UserSchema);
module.exports = User;

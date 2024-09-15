const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    transactionID: {
      type: String,
      required: true,
    },
    orderedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      enum: ["Processing", "Confirmed"],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Orders", OrderSchema);

module.exports = Order;

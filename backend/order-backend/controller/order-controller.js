const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

//Get all orders
// exports.getAllOrders = async (req, res, next) => {
//   const orders = await Order.find();

//   //Get total amount of orders
//   let totalAmount = 0;
//   orders.forEach((order) => {
//     totalAmount += order.totalPrice;
//   });

//   //Get number of total products of all orders
//   let noOfProducts = 0;
//   orders.forEach((order) => {
//     noOfProducts += order.quantity;
//   });

//   res.status(200).json({
//     totalAmount,
//     noOfProducts,
//     orders,
//   });
// };

// //Add new orders
// exports.createOrder = (req, res) => {
//   Order.create(req.body)
//     .then((data) => res.json({ message: "Order added successfully...", data }))
//     .catch((err) =>
//       res
//         .status(400)
//         .json({ message: "Failed to add order", error: err.message })
//     );
// };

// //Update order status
// exports.updateOrderStatus = async (req, res) => {
//   Order.findByIdAndUpdate(req.params.id, req.body.status)
//     .then((data) =>
//       res.json({ message: "Order status updated successfully...", data })
//     )
//     .catch((err) =>
//       res
//         .status(400)
//         .json({ message: "Failed to update order status", error: err.message })
//     );
// };

//Remove order 
exports.removeOrder = (req, res) => {
  Order.findByIdAndRemove(req.params.id, req.body)
    .then((data) =>
      res.json({ message: "Order removed successfully...", data })
    )
    .catch((err) =>
      res
        .status(404)
        .json({ message: "Order not found", error: err.message })
    );
};


exports.findUserID = async (req, res) => {
  const id = req.params.id;
  const quantity = req.body.quantity;

  try {
    const orders = await Order.find({userID: id})
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

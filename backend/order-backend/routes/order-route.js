const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  createOrder,
  updateOrderStatus,
  removeOrder,
  findUserID,
} = require("../controller/order-controller");

router.get("/", getAllOrders);
router.post("/add", createOrder);
router.put("/update/:id", updateOrderStatus);
router.delete("/remove/:id", removeOrder);
router.get("/find/:id", findUserID);

module.exports = router;

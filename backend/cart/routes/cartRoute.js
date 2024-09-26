const express = require("express");
const router = express.Router();

const {
    getAllCartItems,
    getUserCartItems,
    postCreateCartItem,
    putUpdateCartItem,
    deleteCartItem,
    deleteUserCartItems,
    getCartItem,
    putCartItem,
    getCartTotal,
    getCartCount

} = require("../controllers/cartController");

router.get("/", getAllCartItems);
router.get("/getItem/:id", getCartItem)
router.get("/user/getTotal/:id", getCartTotal)
router.get("/users/:id", getCartCount)
router.delete("/user/:userId", deleteUserCartItems)
router.put("/update/:id", putCartItem)
router.get("/:userId", getUserCartItems);
router.post("/", postCreateCartItem);
router.put("/:id", putUpdateCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router;
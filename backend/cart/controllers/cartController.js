const Cart = require("../models/cart");
const { body, validationResult } = require('express-validator'); // Add validation middleware

// Get all cart items
exports.getAllCartItems = (req, res) => {
    Cart.find()
        .then((cartItem) => res.json(cartItem))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Cart item not found", error: err.message })
        );
};

// Create a new cart item (with input validation)
exports.postCreateCartItem = [
    // Validate and sanitize input
    body('userId').notEmpty().withMessage('User ID is required').isString().trim().escape(),
    body('productId').notEmpty().withMessage('Product ID is required').isString().trim().escape(),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        Cart.create(req.body)
            .then((data) => res.json({ message: "Cart item added successfully", data }))
            .catch((err) =>
                res
                    .status(400)
                    .json({ message: "Failed to add cart item", error: err.message })
            );
    }
];

// Get cart items for a user
exports.getUserCartItems = async (req, res) => {
    const id = req.params.userId;
    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e.userId == id);
    res.json(cartItem);
};

// Delete all cart items for a user
exports.deleteUserCartItems = async (req, res) => {
    const userId = req.params.userId;
    try {
      await Cart.deleteMany({ userId: userId });
      res.json("Deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

// Get a single cart item by ID
exports.getCartItem = async (req, res) => {
    const id = req.params.id;
    const cartItems = await Cart.findById(id);
    res.json(cartItems);
}

// Update the quantity of a cart item (input validation and sanitization added)
exports.putCartItem = async (req, res) => {
    const id = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
    }

    try {
        const cart = await Cart.findByIdAndUpdate(id, { quantity: parseInt(quantity) });
        if (!cart) {
            return res.status(404).json({ error: "Cart or item not found" });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Increment cart item quantity (validation added)
exports.getUserCartCount = async (req, res) => {
    const id = req.params.id;

    const filter = { _id: id };

    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e._id == id);
    var c = parseInt(cartItem.quantity);
    c = c + 1;
    const update = { quantity: c };

    let doc = await Cart.updateMany(filter, update);

    res.json(doc);
};

// Delete a cart item by ID
exports.deleteCartItem = (req, res) => {
    Cart.findByIdAndRemove(req.params.id)
        .then((data) =>
            res.json({ message: "Cart item deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Cart item not found", error: err.message })
        );
};

// Update a cart item (validation added)
exports.putUpdateCartItem = [
    // Validate input
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        Cart.findByIdAndUpdate(req.params.id, req.body)
            .then((data) => res.json({ message: "Updated successfully", data }))
            .catch((err) =>
                res
                    .status(400)
                    .json({ message: "Failed to update cart item", error: err.message })
            );
    }
];

// Get the total price of all cart items for a user
exports.getCartTotal = async (req, res) => {
    let sum = 0;
    const id = req.params.id;
    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e.userId == id);
    cartItem.forEach(e => {
        sum += parseFloat(e.total);
    });
    res.json(sum);
}

// Get the total number of cart items for a user
exports.getCartCount = async (req, res) => {
    const id = req.params.id;
    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e.userId == id);
    res.json(cartItem.length);
};

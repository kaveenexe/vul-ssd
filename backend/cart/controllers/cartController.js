// controllers/todo.js
const Cart = require("../models/cart");


exports.getAllCartItems = (req, res) => {
    Cart.find()
        .then((cartItem) => res.json(cartItem))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Cart item not found", error: err.message })
        );
};

exports.postCreateCartItem = (req, res) => {
    Cart.create(req.body)
        .then((data) => res.json({ message: "Cart item added successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add cart item", error: err.message })
        );
};


exports.getUserCartItems = async (req, res) => {
    const id = req.params.userId;
    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e.userId == id);
    res.json(cartItem);
};


exports.deleteUserCartItems = async (req, res) => {
    const userId = req.params.userId;
    try {
      await Cart.deleteMany({ userId: userId });
      res.json("Deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  

  exports.getCartItem = async (req, res) => {
        const id = req.params.id;
        const cartItems = await Cart.findById(id);  
        res.json(cartItems)
    }
  

exports.getUserCartCount = async (req, res) => {

    const id = req.params.id;
    
    const filter = { _id: id };

    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e._id == id );
    var c = parseInt(cartItem.quantity);
    c = c + 1;
    const update = { quantity: c };

    let doc = await Cart.updateMany(filter, update);

    res.json(doc);
    // const cartItem = await Cart.findById(req.params.id);
    // var count = cartItem.quantity;
    // count=count+1;
    // const newCartItem = {...cartItem, quantity: count};
    // Cart.findOneAndReplace(newCartItem);
};





exports.deleteCartItem = (req, res) => {
    Cart.findByIdAndRemove(req.params.id, req.body)
        .then((data) =>
            res.json({ message: "Cart item deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Cart item not found", error: err.message })
        );
};

exports.putUpdateCartItem = (req, res) => {
  Cart.findByIdAndUpdate(req.params.id, req.body)
      .then((data) => res.json({ message: "updated successfully", data }))
      .catch((err) =>
          res
              .status(400)
              .json({ message: "Failed to update cart item", error: err.message })
      );
};

exports.getCartTotal = async(req, res) =>{
    let sum = 0;
    const id = req.params.id;
    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e.userId == id );
    cartItem.forEach(e => {
        sum += parseFloat(e.total)
    })
    res.json(sum);
}

exports.getCartCount = async(req, res) =>{
  const id = req.params.id;
  const cartItems = await Cart.find();
  const cartItem = cartItems.filter(e => e.userId == id);
  res.json(cartItem.length);
}


exports.putCartItem = async (req, res) => {
  const id = req.params.id;
  const quantity = req.body.quantity;

  try {
    const cart = await Cart.findByIdAndUpdate(id, {quantity:quantity})
    if (!cart) {
      return res.status(404).json({ error: "Cart or item not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
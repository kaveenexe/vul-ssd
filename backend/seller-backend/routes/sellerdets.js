const router = require("express").Router();
const Sellerdet = require("../models/Sellerdet");
let Product = require("../models/Sellerdet");

//add product details
router.route("/add").post((req, res) => {
  const category = req.body.category;
  const title = req.body.title;
  const description = req.body.description;
  const price = Number(req.body.price);

  const newProduct = new Product({
    category,
    title,
    description,
    price,
  });

  //send data(object) to the database
  newProduct
    .save()
    .then(() => {
      res.json("Product Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//read product details
router.route("/").get((req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET products by category
router.get("/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//update product details using async await function
//http:localhost:8090/product/update
router.route("/update/:id").put(async (req, res) => {
  //fetch the url coming from the backend
  let productId = req.params.id;
  //coming updated details as body of the req
  const { category, title, description, price } = req.body;

  //the values that want to be updated
  const updateProduct = {
    category,
    title,
    description,
    price,
  };

  //assign model name
  const update = await Sellerdet.findByIdAndUpdate(productId, updateProduct)
    .then(() => {
      //send data to db
      res.status(200).send({ status: "product updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete product
router.route("/delete/:id/").delete(async (req, res) => {
  let productId = req.params.id;

  await Sellerdet.findByIdAndDelete(productId)
    .then(() => {
      res.status(200).send({ status: "Product deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.message });
    });
});

//fetch data from only one product
//status is not an keyword
router.route("/get/:id").get(async (req, res) => {
  let productId = req.params.id;
  const prdct = await Sellerdet.findById(productId)
    .then((seller) => {
      res.status(200).send({ status: "Product fetched", seller });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get product details", error: err.message });
    });
});

module.exports = router;

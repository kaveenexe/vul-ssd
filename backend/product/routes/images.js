import { Router } from "express";
import mongoose from "mongoose";
import Food from "../models/Food.js";
import multer from "multer";
import cloudinary from "cloudinary";


const router = Router();


const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });


cloudinary.config({
  cloud_name: "dg7kcjtlu",
  api_key: "189726296272932",
  api_secret: "dMrT32-k3AGZV_6ruShFRIhGdNM"
});



router.post("/upload", upload.single("image"), async(req, res) => {
  
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const image = result.secure_url;
    const userId = req.body.userId;
   
    //res.secure_url

    const newFoodData = {
        name,
        price,
        description,
        category,
        image,
        userId
    }
    
    const newFood = new Food(newFoodData);

    newFood.save()
        .then(()=> res.json('Food Added'))
        .catch(err => res.status(400).json('Error: '+ err));
});


router.get('/foods', async (req, res) => {
  const todos = await Food.find();
  res.json(todos);
})


router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);

  res.json(food)
})

router.get('/getImage/:id', async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);
  res.json(food.image);

})

// GET products by category
router.get("/:category", async (req, res) => {
  try {
    const products = await Food.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get product by user
router.get("/user/:id", async (req, res) => {
  try {
    const products = await Food.find({ userId: req.params.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Product delete
router.route("/delete/:id/").delete(async (req, res) => {
  let productId = req.params.id;

  await Food.findByIdAndDelete(productId)
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

export default router;
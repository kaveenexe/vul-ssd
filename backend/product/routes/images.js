import { Router } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Food from "../models/Food.js";

const router = Router();

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const { name, price, description, category, userId } = req.body;
    const image = result.secure_url;

    const newFoodData = { name, price, description, category, image, userId };
    const newFood = new Food(newFoodData);

    await newFood.save();
    res.json("Food Added");
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
});

// Other routes remain unchanged

export default router;

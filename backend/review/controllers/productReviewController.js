// controllers/todo.js
const ProductReview = require("../models/productReview");


exports.getAllReviewItems = (req, res) => {
    ProductReview.find()
        .then((reviewItem) => res.json(reviewItem))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Review item not found", error: err.message })
        );
};

exports.postCreateReviewItem = (req, res) => {
    ProductReview.create(req.body)
        .then((data) => res.json({ message: "Review item added successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add review item", error: err.message })
        );
};


exports.getProductReviewItems = async (req, res) => {
    const id = req.params.productId;
    const reviewItems = await ProductReview.find();
    const reviewItem = reviewItems.filter(e => e.productId == id);
    res.json(reviewItem);
};


exports.putUpdateReviewItem = (req, res) => {
    ProductReview.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update review item", error: err.message })
        );
};

exports.deleteReviewItem = (req, res) => {
    ProductReview.findByIdAndRemove(req.params.id, req.body)
        .then((data) =>
            res.json({ message: "Review item deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Review item not found", error: err.message })
        );
};
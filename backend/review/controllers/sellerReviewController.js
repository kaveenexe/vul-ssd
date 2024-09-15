// controllers/todo.js
const SellerReview = require("../models/sellerReview");


exports.getAllReviewItems = (req, res) => {
    SellerReview.find()
        .then((reviewItem) => res.json(reviewItem))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Review item not found", error: err.message })
        );
};

exports.postCreateReviewItem = (req, res) => {
    SellerReview.create(req.body)
        .then((data) => res.json({ message: "Review item added successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add review item", error: err.message })
        );
};


exports.getSellerReviewItems = async (req, res) => {
    const id = req.params.sellerId;
    const reviewItems = await SellerReview.find();
    const reviewItem = reviewItems.filter(e => e.sellerId == id);
    res.json(reviewItem);
};


exports.putUpdateReviewItem = (req, res) => {
    SellerReview.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update review item", error: err.message })
        );
};

exports.deleteReviewItem = (req, res) => {
    SellerReview.findByIdAndRemove(req.params.id, req.body)
        .then((data) =>
            res.json({ message: "Review item deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Review item not found", error: err.message })
        );
};
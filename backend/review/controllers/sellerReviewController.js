const SellerReview = require("../models/sellerReview");

// Controller to get all review items
exports.getAllReviewItems = (req, res) => {
    SellerReview.find()
        .then((reviewItem) => res.json(reviewItem))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Review item not found" }) // Removed detailed error message to prevent exposure
        );
};

// Controller to create a new review item
exports.postCreateReviewItem = (req, res) => {
    SellerReview.create(req.body)
        .then((data) => res.json({ message: "Review item added successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add review item" }) // Removed detailed error message
        );
};

// Controller to get all reviews for a specific seller by sellerId
exports.getSellerReviewItems = async (req, res) => {
    try {
        const id = req.params.sellerId;
        const reviewItems = await SellerReview.find();
        const reviewItem = reviewItems.filter(e => e.sellerId == id);
        res.json(reviewItem);
    } catch (err) {
        res.status(404).json({ message: "Failed to retrieve review items" }); // Generic error message
    }
};

// Controller to update a review item by its ID
exports.putUpdateReviewItem = (req, res) => {
    SellerReview.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "Updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update review item" }) // Removed detailed error message
        );
};

// Controller to delete a review item by its ID
exports.deleteReviewItem = (req, res) => {
    SellerReview.findByIdAndRemove(req.params.id)
        .then((data) =>
            res.json({ message: "Review item deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Review item not found" }) // Generic error message to prevent sensitive data exposure
        );
};

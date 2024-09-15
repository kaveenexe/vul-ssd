// models/todo.js
const mongoose = require("mongoose");

const ProductReviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    review_date: {
        type: Date, 
        default: Date.now
    },
    review: {
        type: String,
        required: true,
    }
});

const ProductReview = mongoose.model("productReview", ProductReviewSchema);

module.exports = ProductReview;
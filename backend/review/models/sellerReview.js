// models/todo.js
const mongoose = require("mongoose");

const SellerReviewSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    sellerId: {
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

const SellerReview = mongoose.model("sellerReview", SellerReviewSchema);

module.exports = SellerReview;
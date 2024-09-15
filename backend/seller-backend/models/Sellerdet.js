const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    category: {
        type : String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    }
})

const Sellerdet = mongoose.model("Sellerdet", SellerSchema);

module.exports = Sellerdet;
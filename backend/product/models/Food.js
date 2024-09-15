import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name:{
        type: String,
    },
    price:{
        type: Number
    },
    description:{
        type: String
    },
    category:{
        type: String
    },
    image:{
        type: String
    },
    userId:{
        type: String
    },
});  

const Food = mongoose.model("Food", foodSchema);
export default Food;
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

require("dotenv").config();


const PORT = process.env.PORT || 8003;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    //seCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false


})

//Mongo db connection
const connection  = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb Connection success")
})

//route
const sellerRouter = require("./routes/sellerdets.js");

//give this name for postmon
app.use("/products", sellerRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})
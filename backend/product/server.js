import express from "express";
import {config} from "dotenv";
import dbConnect from "./dbConnect.js";
import imageRoutes from "./routes/images.js";
import cors from "cors";



const app = express();

//allows us access environment variables like dotenv files
config();
dbConnect();


//allows us get json object in request body
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use("/api", imageRoutes);

const port = process.env.PORT || 9020;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

import express from "express";
import {config} from "dotenv";
import authRoutes from "./routes/auth.js";
import dbConnect from "./dbConnect.js";
import refreshTokenRoutes from "./routes/refreshToken.js";
import userRoutes from "./routes/users.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();
config();
dbConnect();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

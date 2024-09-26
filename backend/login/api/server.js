import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import dbConnect from "./dbConnect.js";
import refreshTokenRoutes from "./routes/refreshToken.js";
import requestRoutes from "./routes/request.js";
import oauth from "./routes/oauth.js";
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

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.options("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", [
    "X-Requested-With",
    "content-type",
    "credentials",
  ]);
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.status(200);
  next();
});

app.use("/oauth/google", requestRoutes);
app.use( "/oauth", oauth );

// Define routes
app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}...`));

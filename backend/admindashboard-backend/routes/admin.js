import express from "express";
import { getCustomers } from "../controllers/admin.js";

const router = express.Router();

router.get("/Customers", getCustomers);

export default router;

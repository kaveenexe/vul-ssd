import { Router } from "express";
import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { signUpBodyValidation, loginBodyValidation } from "../utils/validationSchema.js";
import generateTokens from "../utils/generateTokens.js";
import UserToken from "../models/UserToken.js";
import validator from "validator";

const router = Router();

// Helper function to sanitize inputs
const sanitizeInput = (input) => {
    return validator.escape(input); // Escapes special characters (XSS protection)
};

router.post("/signUp", async (req, res) => {
    try {
        // Sanitize inputs
        const sanitizedEmail = sanitizeInput(req.body.email);
        const sanitizedUserName = sanitizeInput(req.body.userName);
        const sanitizedPassword = sanitizeInput(req.body.password);

        // Validate the sanitized data
        const { error } = signUpBodyValidation({ ...req.body, email: sanitizedEmail, userName: sanitizedUserName, password: sanitizedPassword });
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        // Check if user with the given email already exists
        const user = await User.findOne({ email: sanitizedEmail });
        if (user) {
            return res.status(400).json({ error: true, message: "User with given email already exists" });
        }

        // Hash the sanitized password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(sanitizedPassword, salt);

        // Save the user with sanitized and hashed data
        await new User({ ...req.body, email: sanitizedEmail, userName: sanitizedUserName, password: hashPassword }).save();
        res.status(201).json({ error: false, message: "Account created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.post("/getUser", async (req, res) => {
    try {
        // Sanitize input
        const sanitizedEmail = sanitizeInput(req.body.email);

        const user = await User.findOne({ email: sanitizedEmail });
        if (!user) {
            res.status(401).json({ error: true, message: "User is not there" });
        } else {
            res.status(200).json({
                error: false,
                username: sanitizeInput(user.userName), // Sanitize the output
                message: "User is there",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.post("/get-user-details", async (req, res) => {
    try {
        // Sanitize input
        const sanitizedUserName = sanitizeInput(req.body.username);

        const user = await User.findOne({ userName: sanitizedUserName });
        if (!user) {
            res.status(401).json({ error: true, message: "User is not there" });
        } else {
            res.status(200).json({
                error: false,
                username: sanitizeInput(user.userName), // Sanitize output
                email: sanitizeInput(user.email),
                isCustomer: user.isCustomer,
                isSeller: user.isSeller,
                isAdmin: user.isAdmin,
                id: sanitizeInput(user._id.toString()), // Sanitize output
                message: "User is there",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        // Sanitize inputs
        const sanitizedEmail = sanitizeInput(req.body.email);
        const sanitizedPassword = sanitizeInput(req.body.password);

        // Validate sanitized data
        const { error } = loginBodyValidation({ ...req.body, email: sanitizedEmail, password: sanitizedPassword });
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        // Check if user exists
        const user = await User.findOne({ email: sanitizedEmail });
        if (!user) {
            return res.status(401).json({ error: true, message: "Invalid email or password" });
        }

        // Compare password with the hashed password
        const verifiedPassword = await bcrypt.compare(sanitizedPassword, user.password);
        if (!verifiedPassword) {
            return res.status(401).json({ error: true, message: "Invalid email or password" });
        }

        // Generate tokens
        const { accessToken, refreshToken } = await generateTokens(user);

        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: "Logged in successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

export default router;

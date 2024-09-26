import { Router } from "express";
import UserToken from "../models/UserToken.js";
import jwt from "jsonwebtoken";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
import { refreshTokenBodyValidation } from "../utils/validationSchema.js";
import { sanitize } from "express-validator"; // Ensure input is sanitized

const router = Router();

router.post("/", async(req, res) => {
    const { error } = refreshTokenBodyValidation(req.body);
    if (error)
        return res
            .status(400)
            .json({ error: true, message: error.details[0].message });

    verifyRefreshToken(req.body.refreshToken)
        .then(({ tokenDetails }) => {
            const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_PRIVATE_KEY,
                { expiresIn: "14m" }
            );
            res.status(200).json({
                error: false,
                accessToken,
                message: "Access token created successfully",
            });
        })
        .catch((err) => res.status(400).json(err));
});

router.delete("/", async(req, res) => {
    try {
        const { error } = refreshTokenBodyValidation(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });

        // Sanitize the input
        const refreshToken = sanitize(req.body.refreshToken).trim().escape();

        // Now safely use the sanitized refreshToken in the query
        const userToken = await UserToken.findOne({ token: refreshToken });

        if (!userToken)
            return res
                .status(200)
                .json({ error: false, message: "Logged Out Successfully" });

        await userToken.remove();
        res.status(200).json({ error: false, message: "Logged Out Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

export default router;

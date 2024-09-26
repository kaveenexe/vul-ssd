import express from "express";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const router = express.Router();

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();
  console.log("User Data:", data);
}

/* GET home page. */
router.get("/", async function (req, res, next) {
  const code = req.query.code;
  console.log("Authorization Code:", code);

  try {
    const redirectURL = "http://localhost:3000";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );

    const res = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(res.tokens);
    console.info("Tokens acquired.");
    const user = oAuth2Client.credentials;
    console.log("Credentials:", user);
    await getUserData(user.access_token);
  } catch (err) {
    console.error("Error logging in with OAuth2 user:", err);
  }

  res.redirect(303, "http://localhost:3000/");
});

export default router;

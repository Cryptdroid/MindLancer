import jwt from "jsonwebtoken"; // or use: const jwt = require("jsonwebtoken");

export const verifyToken = (req, res, next) => {
  try {
    console.log("Headers Cookie:", req.headers.cookie);
    const cookies = req.headers.cookie?.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

    console.log("Parsed Cookies:", cookies);

    const token = JSON.parse(cookies?.jwt || "{}").jwt;
    console.log("Extracted Token:", token);

    if (!token) return res.status(401).send("You are not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) return res.status(403).send("Token is not valid!");
      req.userId = payload?.userId;
      next();
    });
  } catch (error) {
    console.error("Error in verifyToken:", error.message);
    return res.status(500).send("Internal Server Error");
  }
};

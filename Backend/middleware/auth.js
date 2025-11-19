// middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const header = req.header("Authorization") || req.header("authorization");
    if (!header)
      return res.status(401).json({ msg: "No token, authorization denied" });

    const token = header.startsWith("Bearer ") ? header.slice(7) : header;

    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not set in environment.");
      return res.status(500).json({ msg: "Server configuration error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains at least { id: userId }
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;

import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - no token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    // Find user in db by MongoDB _id
    const user = await User.findById(decoded._id).select("-password"); // Exclude password from user object

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to req
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - token expired" });
    }
    
    res.status(500).json({ message: "Internal Server Error" });
  }
};
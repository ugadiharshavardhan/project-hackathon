// middleware/adminAuth.js
import jwt from "jsonwebtoken";
import { AdminModel } from "../models/adminModel.js";

export const adminAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const admin = await AdminModel.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.admin = admin; // attach admin info to request
        next();
    } catch (err) {
        console.error("Auth error:", err);
        res.status(401).json({ message: "Unauthorized" });
    }
};

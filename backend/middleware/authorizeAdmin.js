import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.adminId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

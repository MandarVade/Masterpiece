
import jwt from "jsonwebtoken";
import { User } from "../Models/user.models.js";

const getTokenFromRequest = (req) => {
    // prefer cookie, fallback to Authorization header
    const tokenFromCookie = req.cookies?.accessToken;
    if (tokenFromCookie) return tokenFromCookie;

    const authHeader = req.headers?.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }
    return null;
};

export const verifyJwt = async (req, res, next) => {
    try {
        const token = getTokenFromRequest(req);
        if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!payload || !payload._id) return res.status(401).json({ message: "Unauthorized: Invalid token" });

        const user = await User.findById(payload._id).select("-password");
        if (!user) return res.status(401).json({ message: "Unauthorized: User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verify error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Token verification failed", error: error.message });
    }
};

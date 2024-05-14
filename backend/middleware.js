import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./route/userRoutes.js"; 

const authMiddleware = (req, res, next) => {
    const authHeaderToken = req.headers.authorization;

    
    if (!authHeaderToken || !authHeaderToken.startsWith('Bearer ')) {
        return res.status(401).json({ 
            message: "Unauthorized: Missing or invalid token. Please login again." 
        });
    }

    const token = authHeaderToken.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(403).json({ 
            message: "Invalid token. Please login again." 
        });
    }
};

export default authMiddleware;

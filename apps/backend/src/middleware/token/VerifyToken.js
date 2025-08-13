import jwt from 'jsonwebtoken';
import { ResponsePlate } from '../../util/index.js';

const secretKey = process.env.SECRETKEY

export const VerifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return ResponsePlate(res, { status: 403, message: "Access denied. Invalid Token.", success: false })
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return ResponsePlate(res, { status: 403, message: "Access denied. No token provided.", success: false })
    }

    try {
        const data = jwt.verify(token, secretKey);
        req.userDetails = data;
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return ResponsePlate(res, { status: 403, message: "Access denied. Token Expired.", success: false })
        } else {
            return ResponsePlate(res, { status: 403, message: "Access denied. Invalid Token.", success: false })
        }
    }
}
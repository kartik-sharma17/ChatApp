import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRETKEY

export const VerifyToken = (token) => {
    try {
        const data = jwt.verify(token, secretKey);
        return { valid: true, expired: false, data };
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { valid: false, expired: true, decoded: null };
        } else {
            return { valid: false, expired: false, decoded: null };
        }
    }
}
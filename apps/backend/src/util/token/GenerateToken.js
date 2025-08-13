import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRETKEY

export const GenerateToken = (payload, expiresIn = '10d') => {
    return jwt.sign(payload, secretKey, { expiresIn });
}
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config();

const saltRounds = Number(process.env.SALTROUND) || 10;

export const CreateHashCode = (planpassword) => {
    try {
        const generatedCode = bcrypt.hash(planpassword, saltRounds)
        return generatedCode
    }
    catch (error) {
        console.error("Error While hashing password:", error);
        throw error;
    }
}
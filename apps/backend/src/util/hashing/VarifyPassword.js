import bcrypt from 'bcrypt';

export const VerifyPassword = async (plainPassword, hashedPassword) => {
    try {
        const result = await bcrypt.compare(plainPassword, hashedPassword);
        return result
    }
    catch (error) {
        console.error("Error while verifying password:", error);
        throw error;
    }
}
import bcrypt from 'bcrypt';

const VerifyPassword = (plainPassword, hashedPassword) => {
    try {
        const result = bcrypt.compare(plainPassword, hashedPassword);
        return result
    }
    catch (error) {
        console.error("Error while verifying password:", error);
        throw error;
    }
}
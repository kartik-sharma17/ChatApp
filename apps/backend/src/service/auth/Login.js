import prisma from 'db';
import { GenerateToken, ResponsePlate, VerifyPassword } from '../../util/index.js';

export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return ResponsePlate(res, { success: false, message: "User Not Exist Please Check Your Email", status: 400 })
        }

        const checkPassword = await VerifyPassword(password, user.password);

        if (checkPassword) {
            const token = GenerateToken({ email });
            return ResponsePlate(res, { data: { token: token }, message: "Login Successfully", status: 200 });
        }

        return ResponsePlate(res, { success: false, message: "Incorrect Password", status: 400 });
    }
    catch (error) {
        console.error("something went wrong", error);
        return ResponsePlate(res, { success: false, message: "Something Went Wrong", status: 500 });
    }
}
import prisma from 'db';
import { ResponsePlate, CreateHashCode } from '../../util/index.js';

export const Signup = async (req, res) => {
    const { firstName, lastName, email, number, password } = req.body;

    try {
        const existingMail = await prisma.user.findUnique({
            where: { email }
        });


        if (existingMail) {
            return ResponsePlate(res, { status: 409, message: "User Already Exist with this Mail ID", success: false });
        }

        const existingNumber = await prisma.user.findUnique({
            where: { number }
        });

        if (existingNumber) {
            return ResponsePlate(res, { status: 409, message: "User Already Exist with this Phone Number", success: false });
        }

        const hashedPassword = await CreateHashCode(password);

        const user = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                number: number,
                password: hashedPassword
            }
        })

        return ResponsePlate(res, { status: 201, message: "User Created Successfully" });
    }
    catch (error) {
        console.error("something Went Wrong", error);
        return ResponsePlate(res, { status: 500, message: "Somethings Went Wrong While Creating a New User",success:false });
    }

}
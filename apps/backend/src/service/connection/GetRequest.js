import prisma from "db";
import { ResponsePlate } from "../../util/index.js";

export const GetRequest = async (req, res) => {
    try {
        const userDetails = req?.userDetails;

        const user = await prisma.user.findUnique({
            where: { userId: userDetails?.userId }
        })

        if (!user) {
            return ResponsePlate(res, { success: false, message: "Something Went Wrong, Not Able to Find User. Please Login Again", status: 400 });
        }

        return ResponsePlate(res, { data: (user?.requestList || []), success: true, message: "Request List Retrieved Successfully", status: 200 });
    }
    catch (error) {
        console.log("Something Went Wrong ", error);
        return ResponsePlate(res, { success: false, message: "Something Went Wrong, Please Try Again", status: 400 });
    }
}
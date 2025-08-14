import prisma from "db";
import { ResponsePlate } from "../../util/index.js";

export const GetUsers = async (req, res) => {
    try {
        const userDetails = req?.userDetails;

        const users = await prisma.user.findMany({})
        const currentUser = await prisma.user.findUnique({
            where: { userId: userDetails?.userId }
        })

        if (!currentUser) {
            return ResponsePlate(res, { success: false, message: "Something Went Wrong, Please Login and Try Again", status: 400 });
        }

        const removeSelf = users?.filter(user => user?.userId !== userDetails?.userId);

        const filteredUser = removeSelf
            .filter(user => !currentUser?.friendList?.some(friend => friend?.friendId === user?.userId))
            .map(user => ({
                userId: user.userId,
                userName: `${user.firstName} ${user.lastName}`
            }));

        return ResponsePlate(res, { data: (filteredUser), success: true, message: "Users Retrived Successfully", status: 200 });
    }
    catch (error) {
        console.log("Something Went Wrong ", error);
        return ResponsePlate(res, { success: false, message: "Something Went Wrong, Please Try Again", status: 400 });
    }
}
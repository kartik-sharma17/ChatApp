import prisma from "db"
import { ResponsePlate } from "../../util/index.js"

export const RequestResponse = async (req, res) => {
    try {
        const userDetails = req?.userDetails
        const reqBody = req?.body

        if (!reqBody?.requestId) {
            return ResponsePlate(res, { status: 400, message: "Request ID is required", success: false });
        }

        const user = await prisma?.user?.findUnique({
            where: { userId: userDetails?.userId }
        })

        if (!user) {
            return ResponsePlate(res, { status: 400, message: "Something Went Wrong, Please Refresh the Page and Try Again", success: false })
        }

        const requestList = user?.requestList || [];
        const friendRequest = requestList.find(r => r?.requestId === reqBody?.requestId);

        if (!friendRequest) {
            return ResponsePlate(res, { status: 400, message: "Request Not Found, Please Refresh the Page and Try Again", success: false })
        }

        if (reqBody?.requestResponse?.toLowerCase() === "accepted") {

            const newFriendForCurrentUser = {
                friendId: friendRequest?.requestFromId,
                friendName: friendRequest?.requestFromName,
            };

            const newFriendForOtherUser = {
                friendId: userDetails?.userId,
                friendName: `${user?.firstName} ${user?.lastName}`,
            };

            const otherUser = await prisma.user.findUnique({
                where: { userId: friendRequest?.requestFromId }
            })

            if (!otherUser) {
                prisma.user.update({
                    where: { userId: userDetails?.userId },
                    data: {
                        requestList: requestList?.filter(r => r?.requestId !== reqBody?.requestId)
                    }
                })
                return ResponsePlate(res, { status: 200, message: "Requesting User not Found, May be Requesting User Deactived or Deleted Its Id. Friend Request is Successfully Removed", success: true })
            }

            await prisma.$transaction([
                prisma.user.update({
                    where: { userId: userDetails?.userId },
                    data: {
                        friendList: [...(user?.friendList || []), newFriendForCurrentUser],
                        requestList: requestList?.filter(r => r?.requestId !== reqBody?.requestId)
                    }
                }),
                prisma.user.update({
                    where: { userId: friendRequest?.requestFromId },
                    data: {
                        friendList: [...(otherUser?.friendList || []), newFriendForOtherUser]
                    }
                })
            ]);

            return ResponsePlate(res, { status: 200, message: "Friend Added Successfully in Friend List", success: true, data: { friendDetails: newFriendForCurrentUser } })
        }

        else if (reqBody?.requestResponse?.toLowerCase() === "rejected") {
            const filteredList = requestList?.filter(request => request?.requestId !== reqBody?.requestId);

            await prisma.user.update({
                where: { userId: userDetails?.userId },
                data: {
                    requestList: filteredList
                }
            })

            return ResponsePlate(res, { status: 200, message: "Friend Request Rejected Successfully", success: true })
        }

        return ResponsePlate(res, { status: 400, message: "Invalid request response value", success: false });
    }
    catch (error) {
        console.error("Something Went Wrong", error)
        return ResponsePlate(res, { status: 400, message: "Something Went Wrong, Please Refresh the Page and Try Again", success: false })
    }

}
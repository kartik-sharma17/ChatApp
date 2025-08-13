import prisma from 'db';
import { ResponsePlate } from '../../util/index.js';
import { v4 as uuidv4 } from 'uuid';

export const FriendRequest = async (req, res) => {
    try {
        const bodyData = req?.body;
        const userDetails = req?.userDetails;

        const user = await prisma.user.findUnique({
            where: { userId: bodyData?.requestTo }
        })

        if (!user) {
            return ResponsePlate(res, { success: false, message: "Somethings Went Wrong While Sending the Request Please Refresh The Page and Try Again", status: 400 });
        }

        if(userDetails?.userId === bodyData?.requestTo){
            return ResponsePlate(res, { success: false, message: "You Cannot Sent Request To Your Id", status: 400 });
        }

        const existingRequest = user?.requestList || [];

        const alreadyRequested = existingRequest.some(
            req => req.requestFromId === userDetails?.userId && req.requestStatus === "Pending"
        );

        if (alreadyRequested) {
            return ResponsePlate(res, {
                success: false,
                message: "You already have a pending request to this user.",
                status: 400
            });
        }

        const generateRequest = {
            requestFromId: userDetails?.userId,
            requestFromName: userDetails?.userName,
            requestStatus: "Pending",
            requestDateandTime: new Date().toISOString(),
            requestId: uuidv4()
        }

        const updatedRequestlist = [...existingRequest, generateRequest];

        await prisma.user.update({
            where: { userId: bodyData?.requestTo },
            data: {
                requestList: updatedRequestlist
            }
        })

        return ResponsePlate(res, { message: `Request Sent Successfully To ${user?.firstName}`, status: 200 });
    }
    catch (error) {
        console.error("something went wrong = ", error);
        return ResponsePlate(res, { success: false, message: "Somethings Went Wrong While Sending the Request Please Refresh The Page and Try Again", status: 500 });
    }
}
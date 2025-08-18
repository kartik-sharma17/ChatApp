import prisma from 'db';

export const Chat = ({ socket, onlineUser, io }) => {

    socket.on("joinChat", ({ userId, friendId }) => {
        const roomName = [userId, friendId].sort().join("_");
        socket.join(roomName);
    });

    socket.on("sendMessages", async ({ toUserid, fromName, message }) => {
        try {
            const user = await prisma.user.findUnique({
                where: { userId: socket.userId }
            });

            if (!user) {
                socket.emit("errorMessage", { message: "User Not Found, Please Try Again" });
                return;
            }

            const isFriend = user?.friendList?.find(friend => friend.friendId === toUserid);
            if (!isFriend) {
                socket.emit("errorMessage", { message: "Not Able To Send Messages Because User is Not Your Friend" });
                return;
            }

            const targetSocketId = onlineUser.get(toUserid);

            if (!targetSocketId) {
                socket.emit("errorMessage", { message: "User is not Online!" });
                return;
            }

            const roomName = [socket.userId, toUserid].sort().join("_");

            io.to(roomName).emit("messageReceive", {
                from: socket.userId,
                to: toUserid,
                message
            });

            console.log(fromName)

            io.to(targetSocketId).emit("messageNotification", {
                from: socket.userId,
                fromName,
                messagePreview: message.slice(0, 50)
            });

        } catch (error) {
            console.error("Something Went Wrong", error);
            socket.emit("errorMessage", { message: "Something Went Wrong, Please Try Again" });
        }
    });
};

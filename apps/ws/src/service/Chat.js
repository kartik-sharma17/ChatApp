import prisma from 'db';

export const Chat = ({ socket, onlineUser, io }) => {

    socket.on("send_messages", async ({ toUserid, message }) => {
        try {
            const user = await prisma.user.findUnique({
                where: { userId: socket.userId }
            })

            if (!user) {
                socket.emit("error_message", { message: "User Not Found, Please Try Again" });
                return
            }

            const isFriend = user?.friendList?.find(friend => friend.friendId === toUserid);

            if (!isFriend) {
                socket.emit("error_message", { message: "Not Able To Send Messages Becouse User is Not Your Friend" });
                return
            }

            const targetedSocketid = onlineUser.get(toUserid);

            if (targetedSocketid) {
                io.to(targetedSocketid).emit("message_receive", message)
            }
            else {
                socket.emit("error_message", { message: "User is not Online!" });
            }
        }
        catch (error) {
            console.error("Something Went Wrong", error);
            socket.emit("error_message", { message: "Something Went Wrong, Please Try Again" });
        }
    })
}
import { Server } from 'socket.io';
import { Chat } from '../service/index.js';

let io;
let onlineUser = new Map();

export const serverSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    })

    io.on("connection", (socket) => {

        console.log("User connected",socket.id);

        socket.on("register", async (userId) => {
            socket.userId = userId;
            onlineUser.set(userId, socket.id);
            console.log(`User ${userId} is online with socket ${socket.id}`);
        })

        Chat({ socket, onlineUser, io })

        socket.on("disconnect", () => {
            onlineUser.delete(socket.userId);
            console.log("user Disconnected", socket.id)
        })
    });




}
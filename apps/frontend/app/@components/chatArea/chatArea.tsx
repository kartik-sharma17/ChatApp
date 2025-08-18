"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Socket } from "@/app/webSocket";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const ChatArea = ({ friendId, friendName }: any) => {
    const userId = Cookies.get("userId");
    const userName = Cookies.get("userName");

    const [messages, setMessages] = useState<{ text: string; from: string, to: string }[]>([]);

    const formik = useFormik({
        initialValues: {
            text: ""
        },
        onSubmit: (values) => {

        }
    })

    useEffect(() => {
        if (!userId || !friendId) return;

        Socket.emit("joinChat", { userId, friendId });

        const handleMessage = ({ from, to, message }: any) => {
            if (from === friendId || to === friendId) {
                setMessages((prev) => [...prev, { text: message, from, to }]);
            }
        };

        Socket.on("messageReceive", handleMessage);

        return () => {
            Socket.off("messageReceive", handleMessage);
        };
    }, [userId, friendId]);


    const sendMessage = () => {
        const message = formik?.values?.text
        Socket.emit("sendMessages", { toUserid: friendId, fromName: userName, message: message })
    }

    return (
        <div className="relative h-11/12">
            <h2 className="border-b-2 p-3 border-[#13191e]" >{friendName}</h2>
            <div className="flex flex-col">
                {messages.map((data: any, index: any) => (
                    <span className="" key={index}>{data?.text}</span>
                ))}
            </div>
            <div className="flex justify-center items-center absolute w-full bottom-5">
                <input className="p-2 w-8/10 rounded-sm border-[#2b3135] border-2" name={"text"} onChange={formik.handleChange} />
                <button onClick={sendMessage} className="flex justify-center items-center bg-green-600 rounded-full w-10 h-10 ml-3"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </div>
    )
}

"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Socket } from "@/app/webSocket";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { ChatBoxdailog } from "../chatBoxdailog/chatBoxdailog";

export const ChatArea = ({ friendId, friendName }: any) => {
    const userId = Cookies.get("userId");
    const userName = Cookies.get("userName");

    const [messages, setMessages] = useState<{ text: string; from: string, to: string }[]>([]);

    useEffect(() => {
        console.log("thi si sa = ", messages)
    })

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

        const handleError = ({ message }: any) => {
            toast.error(message);
        }

        Socket.on("messageReceive", handleMessage);
        Socket.on("errorMessage", handleError);

        return () => {
            Socket.off("messageReceive", handleMessage);
            Socket.off("errorMessage", handleError);
            Socket.off("joinChat");
        };
    }, [userId, friendId]);


    const sendMessage = () => {
        const message = formik?.values?.text
        Socket.emit("sendMessages", { toUserid: friendId, fromName: userName, message: message })
        formik.setFieldValue("text", "");
    }

    return (
        <div className="relative h-11/12">
            <ChatBoxdailog/>
            <h2 className="border-b-2 p-3 border-[#13191e]" >{friendName}</h2>
            <div className="flex flex-col p-2">
                {messages.map((data: any, index: any) => (
                    data?.from === userId ?
                        <span className="bg-[#008000] text-right rounded-sm ml-auto w-8/12 px-3 py-1 my-2" key={index}>{data?.text}</span> :
                        <span className="bg-white text-black my-2 rounded-sm w-8/12 px-3 py-1" key={index}>{data?.text}</span>
                ))}
            </div>
            <div className="flex justify-center items-center absolute w-full bottom-5">
                <input value={formik.values.text} placeholder="Wite Your Message Here" className="p-2 w-8/10 rounded-sm border-[#2b3135] border-2" name={"text"} onChange={formik.handleChange} />
                <button onClick={sendMessage} className="flex justify-center items-center bg-green-600 rounded-full w-10 h-10 ml-3"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </div>
    )
}

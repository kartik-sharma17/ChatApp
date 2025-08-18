"use client"
import { Socket } from "@/app/webSocket"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { ChatBoxdailog } from "@/app/@components"

const page = () => {
  const userId = Cookies.get("userId");

  useEffect(() => {
    Socket.emit("register", userId)

    return () => {
      Socket.off("register");
    };
  }, [])

  return (
    <>
      <ChatBoxdailog />
      <div className="p-5">Please Click on Friend from Your Friend List to Initialize Chat</div>
    </>

  )
}

export default page
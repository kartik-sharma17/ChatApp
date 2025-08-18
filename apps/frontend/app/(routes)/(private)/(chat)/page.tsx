"use client"
import { Socket } from "@/app/webSocket"
import { useEffect } from "react"
import Cookies from "js-cookie"

const page = () => {
  const userId = Cookies.get("userId");

  useEffect(() => {
    Socket.emit("register", userId)

    return () => {
      Socket.off("register");
    };
  }, [])

  return (
    <div>this is a default routes</div>
  )
}

export default page
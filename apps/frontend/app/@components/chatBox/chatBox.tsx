'use client'
import { useGetFriendsQuery } from "@/app/@redux/services"
import Link from "next/link"
import { useEffect } from "react";

export const ChatBox = () => {
  const { data, isLoading, isError } = useGetFriendsQuery()
  return (
    <div className="h-screen border-l-2 border-[#13191e] p-3">
      <h3 className="border-b-2 p-3 border-[#13191e]">Friends</h3>
      {data?.data.map((data: any, index: any) => (
        <Link key={index} href={{ pathname: data?.friendId, query: { id: data?.friendId, name: data?.friendName } }} >
          <div className="bg-[#13191e] w-full h-15 rounded-sm mt-3 p-3 flex items-center text-[#7b838d] hover:text-gray-300">
            <h2>{data?.friendName}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
"use client"
import { CustomDataTable } from "@/app/@core"
import { useGetRequestQuery } from "@/app/@redux/services"
import { useEffect } from "react"


const columns: any = [
    {
        header: "sno",
        cell: ({ row }: any) => (
            <div className="capitalize">{row?.index + 1}</div>
        )
    },
    {
        header: "Request From",
        cell: ({ row }: any) => {
            return <div className="capitalize">status</div>
        },
    },
    {
        header: "Action",
        cell: ({ row }: any) =>
            <div className="flex gap-10 justify-center">
                <button className="bg-green-600 px-5 text-white py-2 rounded-lg">Accept</button>
                <button className="bg-red-500 px-5 text-white py-2 rounded-lg">Accept</button>
            </div>
    },
]

export const FriendRequest = () => {

    const { data, isLoading, isSuccess } = useGetRequestQuery();

    if (!isSuccess) {

    }

    return (
        <div className="bg-[#0a0a0a] h-screen text-[#7b838d] pt-10">
            <CustomDataTable addClass={"w-8/10 mx-auto"} columns={columns} data={data?.data} />
        </div>
    )
}



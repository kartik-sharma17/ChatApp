"use client"
import { CustomAlert, CustomDataTable, CustomSkeleton } from "@/app/@core"
import { useGetRequestQuery, useRequestResposeMutation } from "@/app/@redux/services"
import { useEffect } from "react"
import { toast } from "sonner"



export const FriendRequest = () => {

    const { data, isLoading, isError } = useGetRequestQuery();
    const [requestResponse, { isLoading: laoding2, isError: error2 }] = useRequestResposeMutation();

    const handleResponse = async ({ row, response }: any) => {
        const payload = {
            requestId: row?.original?.requestId,
            requestResponse: response
        }
        console.log(payload);
        try {
            const res = await requestResponse(payload).unwrap();
            if (response === 'accepted') {
                toast.success(res?.message);
            }
            else {
                toast.error(res?.message);
            }
        }
        catch (error) {
            toast.error(error?.message);
        }
    }

    const dateFormatter = (row: any) => {
        const date = new Date(row).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })

        return date;
    }


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
                return <div className="capitalize">{row?.original?.requestFromName}</div>
            },
        },
        {
            header: "Date Of Request",
            cell: ({ row }: any) =>
                <div className="capitalize">{dateFormatter(row?.original?.requestDateandTime)}</div>

        },
        {
            header: "Action",
            cell: ({ row }: any) => {
                return <div className="flex gap-10 justify-center">
                    <button onClick={() => { handleResponse({ row, response: "accepted" }) }} className="bg-green-600 px-5 text-white py-2 rounded-lg">Accept</button>
                    <button onClick={() => { handleResponse({ row, response: "rejected" }) }} className="bg-red-500 px-5 text-white py-2 rounded-lg">Reject</button>
                </div>
            }
        },
    ]

    useEffect(() => {
        if (isError) {
            toast.error("Somethings Went Wrong While Fetching the Friend List")
        }
    }, [isError])


    return (
        <div className="bg-[#0a0a0a] h-screen text-[#7b838d] pt-10">
            {isLoading ? <CustomSkeleton addClass={"w-8/10 h-100 bg-gray-700"} /> :
                data?.data.length > 0 ? (
                    <CustomDataTable addClass={"w-8/10 mx-auto"} columns={columns} data={data?.data} />
                ) : <CustomAlert addClass={"px-10"} variant="destructive" title={"No Friend Request!"} description={"There is No Request Found on your ID"} />

            }
        </div>
    )
}



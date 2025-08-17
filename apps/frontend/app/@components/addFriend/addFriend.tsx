"use client"
import { CustomAlert, CustomDataTable, CustomSkeleton } from "@/app/@core"
import { useGetUserQuery, useSendRequestMutation } from "@/app/@redux/services"
import { useEffect } from "react"
import { toast } from "sonner"

export const SendRequest = () => {

    const { data, isLoading, isError } = useGetUserQuery();
    const [sendRequest] = useSendRequestMutation();

    const handleResponse = async (row: any) => {
        const payload = {
            requestTo: row?.original?.userId,
        }
        try {
            const res = await sendRequest(payload).unwrap();
            toast.success(res?.message);
        }
        catch (error) {
            toast.error(error?.message);
        }
    }


    const columns: any = [
        {
            header: "sno",
            cell: ({ row }: any) => (
                <div className="capitalize">{row?.index + 1}</div>
            )
        },
        {
            header: "Name",
            cell: ({ row }: any) => (
                <div className="capitalize">{row?.original?.userName}</div>
            )
        },
        {
            header: "Action",
            cell: ({ row }: any) => {
                return <div className="flex gap-10 justify-center">
                    <button onClick={() => { handleResponse(row) }} className="bg-green-600 px-5 text-white py-2 rounded-lg">Send Request</button>
                </div>
            }
        },
    ]

    useEffect(() => {
        if (isError) {
            toast.error("Somethings Went Wrong While Fetching the Users")
        }
    }, [isError])


    return (
        <div className="bg-[#0a0a0a] h-screen text-[#7b838d] pt-10">
            {isLoading ? <CustomSkeleton addClass={"w-8/10 h-100 bg-gray-700"} /> :
                data?.data.length > 0 ? (
                    <CustomDataTable addClass={"w-8/10 mx-auto"} columns={columns} data={data?.data} />
                ) : <CustomAlert addClass={"px-10"} variant="destructive" title={"No User Found!"} description={"There is No User Found"} />
            }
        </div>
    )
}



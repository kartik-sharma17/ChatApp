import { useGetFriendsQuery } from "@/app/@redux/services"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"


export const ChatBoxdailog = () => {
    const { data, isLoading, isError } = useGetFriendsQuery()
    return (
        <div className="block md:hidden">
            <Dialog>
                <DialogTrigger className="w-full my-2"><button className="mx-auto bg-red-400 px-3 py-1 rounded-sm">Chat Box</button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Friends</DialogTitle>
                    </DialogHeader>
                    <div className="p-3">
                        {data?.data.map((data: any, index: any) => (
                            <Link key={index} href={{ pathname: data?.friendId, query: { id: data?.friendId, name: data?.friendName } }} >
                                <div className="bg-[#13191e] w-full h-15 rounded-sm mt-3 p-3 flex items-center text-[#7b838d] hover:text-gray-300">
                                    <h2>{data?.friendName}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>

    )
}
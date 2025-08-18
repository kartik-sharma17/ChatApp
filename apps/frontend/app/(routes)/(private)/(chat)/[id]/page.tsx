'use client'
import { ChatArea } from '@/app/@components'
import { useSearchParams } from 'next/navigation'

const DynamicChat = () => {
    const param = useSearchParams();

    return (
        <ChatArea friendId={param.get("id")}
            friendName={param.get("name")} />
    )
}

export default DynamicChat
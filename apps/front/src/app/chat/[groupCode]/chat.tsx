import { API_HOST } from "@/api";
import Button from "@/components/button";
import Input from "@/components/input";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

interface Message {
    username: string
    content: string
}

function Message({ username, content }: { username: string, content: string }) {
    return <div className="flex flex-col">
        <span className="text-red-500">{username}:</span>
        <span className="text-gray-800">{content}</span>
    </div>
}

export default function Chat({ groupCode, username }: { groupCode: string, username: string }) {

    const wsInstance = useMemo(() => new WebSocket("ws://" + API_HOST + "/ws"), []);
    const [messages, setMessages] = useState<Message[]>([])
    const [messageBuffer, setMessageBuffer] = useState<string>("")

    wsInstance.onopen = () => {
        wsInstance.send(JSON.stringify({ 
            "event": "join", 
            "data": { "username": username, "group": groupCode } 
        }))
    }
    
    wsInstance.onmessage = (event) => {
        var message = JSON.parse(event.data)
        var eventName = message.event
        var data = message.data

        if (eventName == "joined") {
            newMessage("System", data.message)
        }
        else if (eventName == "message") {
            newMessage(data.username, data.content)
        }
        else if (eventName == "left") {
            newMessage("System", `${data.username} has left the group`)
        }
    }

    const newMessage = (username: string, content: string) => {
        var newMessages = [...messages]
        newMessages.push({
            "username": username,
            "content": content
        })
        setMessages(newMessages)
    }

    const sendMessage = () => {
        wsInstance.send(JSON.stringify({
            "event": "message",
            "data": { 
                "content": messageBuffer 
            }
        }))
        setMessageBuffer("")
    }

    return <>
        <div className="flex flex-col gap-2 mb-2 h-full w-full overflow-y-scroll">
            {messages.map((message, index) => <Message key={index} username={message.username} content={message.content} />)}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); sendMessage() }} className="flex gap-2 w-full">
            <Input value={messageBuffer} onChange={(e) => setMessageBuffer(e.target.value)} className="w-full" placeholder="Message" type="text" />
            <Button onClick={sendMessage}>💬</Button>
        </form>
    </>
}
"use client";

import "./page.scss";
import { use, useEffect, useRef, useState } from "react"

export default function Page() {
    const chatInputRef = useRef<HTMLInputElement>(null)
    const clientsRef = useRef<HTMLSpanElement>(null)
    const messagesRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<any>([])

    const [username, setUsername] = useState<string | null>(null) // new URLSearchParams(window.location.search).get('u')
    const [roomID, setRoomID] = useState<string | null>(null) // new URLSearchParams(window.location.search).get('r')
    const wsRef = useRef<WebSocket | null>(null);

    function submitChatInput(e: any) {
        e.preventDefault()

        const content = chatInputRef.current!.value
        chatInputRef.current!.value = ""

        if (!content)
            return

        const ws = wsRef.current

        if (!ws) {
            alert("Not connected")
            return
        }

        ws.send(JSON.stringify({
            "event": "message",
            "data": {
                "content": content
            }
        }))
    }

    function wsHandler(username: string, roomID: string) {
        const ws = new WebSocket(location.protocol.replace("http", "ws") + '//' + window.location.host + '/ws/chat')
        wsRef.current = ws

        ws.onopen = () => {
            ws!.send(JSON.stringify({
                "event": "join",
                "data": {
                    "username": username,
                    "room_id": roomID
                }
            }))
        }

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data)

            if (message.event === "new_message") {
                setMessages((prev: any) => [...prev, {
                    user: message.data.user,
                    content: message.data.content,
                    is_me: message.data.is_me,
                    sender: "client"
                }])
            } else if (message.event === "client_joined") {
                setMessages((prev: any) => [...prev, {
                    user: message.data.user,
                    content: "User " + message.data.user.username + " joined the room",
                    sender: "system",
                    error: false
                }])
                clientsRef.current!.textContent = message.data.total
            } else if (message.event === "client_left") {
                setMessages((prev: any) => [...prev, {
                    content: "User " + message.data.user.username + " left the room",
                    sender: "system",
                    error: false
                }])
                clientsRef.current!.textContent = message.data.total
            } else if (message.event === "error") {
                setMessages((prev: any) => [...prev, {
                    content: message.data.error,
                    sender: "system",
                    error: true
                }])
            }
        }
    }

    useEffect(() => {
        var username = new URLSearchParams(window.location.search).get('u')
        setUsername(username)
        var roomID = new URLSearchParams(window.location.search).get('r')
        setRoomID(roomID)

        if (username && roomID)
            wsHandler(username, roomID)

        return () => {
            const ws = wsRef.current
            if (ws)
                ws.close();
        };
    }, [])

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);


    if (!username || !roomID) {
        return <div>Invalid URL</div>
    }

    return <div className="content-block full chat">
        <div className="nav">
            <div className="info">
                <img src="/static/assets/icons/room.png" alt="" />
                <span id="span-room">{roomID}</span>
            </div>
            <div className="sep"></div>
            <div className="info">
                <img src="/static/assets/icons/username.png" alt="" />
                <span id="span-username">{username}</span>
            </div>
            <div className="sep"></div>
            <div className="info">
                <img src="/static/assets/icons/members.png" alt="" />
                <span id="span-clients" ref={clientsRef}>0</span>
            </div>
        </div>
        <div className="messages-container">
            <div id="messages" ref={messagesRef}>
                {
                    messages.map((message: any, index: number) => {
                        return message.sender === "system" ?
                            <div key={index} className="system-message-container">
                                <span className={`content error-${message.error}`}>{message.content}</span>
                            </div>
                            :
                            <div key={index} className="message-container">
                                <div className={`message is-me-${message.is_me}`}>
                                    <span className="username">{message.user.username}</span>
                                    <span className="content">{message.content}</span>
                                </div>
                            </div>
                    })
                }
            </div>
            <form className="input-box" onSubmit={submitChatInput}>
                <input id="input-content" type="text" ref={chatInputRef} />
            </form>
        </div>
    </div>
}
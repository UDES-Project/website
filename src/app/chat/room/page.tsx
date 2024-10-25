"use client";

import { redirect } from "next/navigation";
import "./page.scss";
import { FormEvent, useEffect, useRef, useState } from "react"

interface Message {
    content: string
    sender: string
    user?: {
        username: string
    }
    is_me?: boolean
    error?: boolean
}

function AskUsername({ roomID }: { roomID: string }) {

    const usernameRef = useRef<HTMLInputElement>(null)

    function submitCreateChatForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const username = usernameRef.current!.value

        window.location.href = `/chat/room?r=${roomID}&u=${username}`
    }

    return <div className="content-block">
        <div className="content">
            <form className="chat-form" onSubmit={submitCreateChatForm}>
                <div className="input-wrapper">
                    <img src="/static/assets/icons/username.png" alt="" />
                    <input id="input-username" type="text" placeholder="Username" ref={usernameRef} />
                </div>
                <button className="button green">Join</button>
            </form>
        </div>
    </div>
}

export default function Page() {
    const chatInputRef = useRef<HTMLInputElement>(null)
    const clientsRef = useRef<HTMLSpanElement>(null)
    const messagesRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([])

    const [username, setUsername] = useState<string | null>(null) // new URLSearchParams(window.location.search).get('u')
    const [roomID, setRoomID] = useState<string | null>(null) // new URLSearchParams(window.location.search).get('r')
    const wsRef = useRef<WebSocket | null>(null);

    const sharePopupRef = useRef<HTMLDialogElement>(null);
    const [copyDone, setCopyDone] = useState(false);

    const [roomLink, setRoomLink] = useState("");

    function openSharePopup() {
        sharePopupRef.current!.showModal()
    }

    function copyRoomLink() {
        setCopyDone(true)

        navigator.clipboard.writeText(window.location.origin + window.location.pathname + `?r=${roomID}`)

        setTimeout(() => {
            setCopyDone(false)
        }, 2000)
    }

    function submitChatInput(e: FormEvent<HTMLFormElement>) {
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
        const ws = new WebSocket(window.location.protocol.replace("http", "ws") + '//' + window.location.host + '/ws/chat')
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
                setMessages((prev: Message[]) => [...prev, {
                    user: message.data.user,
                    content: message.data.content,
                    is_me: message.data.is_me,
                    sender: "client"
                }])
            } else if (message.event === "client_joined") {
                setMessages((prev: Message[]) => [...prev, {
                    user: message.data.user,
                    content: "User " + message.data.user.username + " joined the room",
                    sender: "system",
                    error: false
                }])
                clientsRef.current!.textContent = message.data.total
            } else if (message.event === "client_left") {
                setMessages((prev: Message[]) => [...prev, {
                    content: "User " + message.data.user.username + " left the room",
                    sender: "system",
                    error: false
                }])
                clientsRef.current!.textContent = message.data.total
            } else if (message.event === "error") {
                setMessages((prev: Message[]) => [...prev, {
                    content: message.data.error,
                    sender: "system",
                    error: true
                }])
            }
        }
    }

    useEffect(() => {
        const username = new URLSearchParams(window.location.search).get('u')
        setUsername(username || "@unknown")
        const roomID = new URLSearchParams(window.location.search).get('r')
        setRoomID(roomID || "@unknown")

        setRoomLink(window.location.origin + window.location.pathname + `?r=${roomID}`)

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

    if (roomID == "@unknown") {
        return redirect("/chat")
    }

    if (username == "@unknown") {
        return <AskUsername roomID={roomID!} />
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
            <div className="sep"></div>
            <div onClick={openSharePopup} className="share info">
                <img src="/static/assets/icons/share.png" alt="" />
                <span>Share</span>
            </div>
        </div>
        <div className="messages-container">
            <div id="messages" ref={messagesRef}>
                {
                    messages.map((message: Message, index: number) => {
                        return message.sender === "system" ?
                            <div key={index} className="system-message-container">
                                <span className={`content error-${message.error}`}>{message.content}</span>
                            </div>
                            :
                            <div key={index} className="message-container">
                                <div className={`message is-me-${message.is_me}`}>
                                    <span className="username">{message.user!.username}</span>
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
        <dialog className="share-popup" ref={sharePopupRef}>
            <div className="content">
                <h1>Share</h1>
                <span>Room ID</span>
                { roomID ? <input className="input" type="text" value={roomID} readOnly /> : undefined }
                <span>Room Link</span>
                <div className="input-wrapper">
                    <input type="text" value={roomLink} readOnly/>
                    <button onClick={copyRoomLink}><img src={`/static/assets/icons/${copyDone ? "done.png" : "copy.png"}`} alt=""/></button>
                </div>
                <form method="dialog">
                    <button className="button green">OK</button>
                </form>
            </div>
        </dialog>
    </div>
}
"use client";

import { useRef } from "react"
import "./page.scss"

export default function Page() {

    const roomIdRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);

    function randomRoomID() {
        roomIdRef.current!.value = Math.random().toString(36).slice(2, 10)
    }

    const submitChatForm = (e: any) => {
        e.preventDefault()

        const roomID = roomIdRef.current!.value
        const username = usernameRef.current!.value

        location.href = `/chat/room?r=${roomID}&u=${username}`
    }

    return <>
        <div className="little-header header nav-height"></div>
        <div className="content-block">
            <h2>Chat</h2>
            <form className="chat-form" onSubmit={submitChatForm}>
                <div className="input-wrapper">
                    <img src="/static/assets/icons/room.png" alt=""/>
                    <input id="input-room_id" type="text" placeholder="Room ID" ref={roomIdRef}/>
                    <button type="button" className="random" onClick={randomRoomID}>
                        <img src="/static/assets/icons/random.png" alt=""/>
                    </button>
                </div>
                <div className="input-wrapper">
                    <img src="/static/assets/icons/username.png" alt=""/>
                    <input id="input-username" type="text" placeholder="Username" ref={usernameRef}/>
                </div>
                <button className="button green">Join</button>
            </form>
        </div>
    </>
}
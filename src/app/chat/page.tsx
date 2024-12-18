"use client";

import { FormEvent, useRef } from "react"
import { randomBytes } from "crypto";
import "./page.scss"

export default function Page() {

    const roomIdRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);

    const submitJoinChatForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const roomID = roomIdRef.current!.value

        location.href = `/chat/room?r=${roomID}`
    }

    function randomRoomID() {
        const rb = randomBytes(16);
        const encodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let r = "";
        for (let i = 0; i < rb.length; i++) {
            const j = rb[i] % encodeChars.length;
            r = r+encodeChars[j];
        }
        return r;
    }

    const submitCreateChatForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const roomID = randomRoomID()
        const username = usernameRef.current!.value

        location.href = `/chat/room?r=${roomID}&u=${username}`
    }

    return <>
        <div className="little-header header nav-height"></div>
        <div className="content-block">
            <div className="content">
                <form className="chat-form" onSubmit={submitJoinChatForm}>
                    <span>Someone has sent you a Room ID. Enter it in the field below and click on &quot;Join a Room&quot;.</span>
                    <div className="input-wrapper">
                        <img src="/static/assets/icons/room.png" alt=""/>
                        <input id="input-room_id" type="text" placeholder="Room ID" ref={roomIdRef}/>
                    </div>
                    <button className="button green">Join a Room</button>
                </form>
                <div className="sep"></div>
                <form className="chat-form" onSubmit={submitCreateChatForm}>
                    <span>To create a new room and chat with anyone, enter your username and press &quot;Create a room&quot;.</span>
                    <div className="input-wrapper">
                        <img src="/static/assets/icons/username.png" alt=""/>
                        <input id="input-username" type="text" placeholder="Username" ref={usernameRef}/>
                    </div>
                    <button className="button green">Create a Room</button>
                </form>
            </div>
        </div>
    </>
}
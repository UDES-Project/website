"use client";

import { useState } from "react";
import Username from "./username";
import Chat from "./chat";

export default function Page({ params }: { params: { groupCode: string } }) {

    const [username, setUsername] = useState("");

    return username ? <Chat groupCode={params.groupCode} username={username} /> : <Username groupCode={params.groupCode} setUsername={setUsername} />
}
"use client"

import Link from "next/link";
import { useState } from "react"

export default function Page() {

    const [groupCode, setGroupCode] = useState<string>("")

    function generateGroupCode(): void {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let groupCode = '';
        for (let i = 0; i < 10; i++) {
            groupCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setGroupCode(groupCode);
    }

    return <>
        <h1 className="text-3xl">Chat UMES</h1>
        <div className="flex gap-2">
            <input onChange={(e) => setGroupCode(e.target.value)} value={groupCode} placeholder="Code du groupe" type="text" className="p-2 px-3 border rounded bg-gray-50" />
            <button onClick={generateGroupCode} className="p-2 border rounded bg-gray-50">🔄</button>
        </div>
        <Link href={`/chat/${groupCode}`} className="p-2 px-3 border rounded bg-gray-50">Rejoindre</Link>
    </>
}
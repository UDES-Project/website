import { Dispatch, SetStateAction, useState } from "react";

export default function Username({ groupCode, setUsername }: { groupCode: string, setUsername: Dispatch<SetStateAction<string>> }) {
    
    const [usernameBuffer, setUsernameBuffer] = useState<string>("")
    
    return <>
        <h1 className="text-3xl">Groupe: {groupCode}</h1>
        <div className="flex gap-2">
            <input onChange={(e) => setUsernameBuffer(e.target.value)} placeholder="Nom d'utilisateur" type="text" className="p-2 px-3 border rounded bg-gray-50" />
            <button onClick={() => setUsername(usernameBuffer)} className="p-2 border rounded bg-gray-50">✅</button>
        </div>
    </>
}
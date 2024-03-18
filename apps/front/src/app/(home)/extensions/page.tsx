import Link from "next/link"

function ExtensionCard({ name, icon, showcase, github, install }: { name: string, icon: string, showcase?: string, github?: string, install: string }) {
    return <div className="flex border-b p-3 justify-between bg-gray-50">
        <div className="flex gap-2 items-center ml-4">
            <img src={icon} className="h-6" alt="" />
            <h1>{name}</h1>
        </div>
        <div className="flex gap-3 items-center">
            { showcase && <Link href={showcase} className="text-sm">Showcase</Link> }
            { github && <Link href="#" className="text-sm">Github</Link>}
            <div className="h-full w-[1px] bg-gray-300"></div>
            <Link href={install} className="p-2 px-3 rounded bg-green-700 text-white">Install</Link>
        </div>
    </div>
}

export default function Page() {
    return <div className="p-40 px-96">
        <h1 className="text-3xl border-b w-fit mb-8">Extensions</h1>
        <div className="flex flex-col gap-2">
            <ExtensionCard name="Discord" icon="/assets/discord.svg" install="#" github="#" showcase="#"/>
            <ExtensionCard name="WhatsApp Web" icon="/assets/whatsapp.svg" install="#" github="#"/>
        </div>
    </div>
}
import Link from "next/link";

export default function NavBar() {
    return <nav className="fixed top-0 z-50 w-full h-16 border-b flex items-center justify-between px-8">
        <div>
            <Link href="/"><img className="h-16" src="/assets/UMES.png"/></Link>
        </div>
        <div className="flex gap-4 items-center">
            <Link href="/chat">Chat</Link>
            <Link href="/extensions">Extensions</Link>
            <Link href="/infos">Informations</Link>
            <Link href="/chat"><img src="/assets/github.svg" className="h-6" /></Link>
        </div>
    </nav>
}
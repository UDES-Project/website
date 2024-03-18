import Button from "@/components/button";
import Link from "next/link";

export default function Home() {
    return <>
        <main>
            <div className="h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">UMES</h1>
                <span className="border-b mb-4 text-sm">Universal Message Encryption System</span>
                <h3 className="text-lg font-bold mb-4">An update for online message confidentiality</h3>
                <div className="flex gap-2">
                    <a href="/extensions"><Button>Install</Button></a>
                    <a href="/infos"><Button>More Infos</Button></a>
                </div>
            </div>
        </main>
    </>
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="p-10 h-screen w-screen bg-zinc-200">
            <div className="p-2 w-full h-full bg-white rounded drop-shadow-xl flex flex-col items-center justify-center gap-2">
                {children}
            </div>
            <div className="absolute top-4 right-4 p-4 max-w-[400px] gap-2 rounded drop-shadow-xl bg-red-500 flex flex-col text-white">
                <h1 className="text-2xl text-center">🚨 You&apos;re not securized ! 🚨</h1>
                <span className="text-left">Without using the UMES extension, messages in this chat will be visible to anyone!</span>
                <div className="mx-auto h-[1px] w-1/3 bg-white"></div>
                <span className="text-left">Please install the extension here: <a className="underline" href="/" target="_blank">Install</a></span>
                <span className="text-left">How to install the extension: <a className="underline" href="/" target="_blank">Tutorial</a></span>
                <span className="text-left">Why use UMES ? <a className="underline" href="/" target="_blank">About UMES</a></span>
            </div>
        </div>
    );
}

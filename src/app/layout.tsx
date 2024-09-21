import "./globals.scss";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <nav>
                    <div className="bar">
                        <div className="block">
                            <a href="/">
                                <img src="/static/assets/logo-white.png" />
                            </a>
                        </div>
                        <div className="block">
                            <a href="/">Home</a>
                            <a href="/chat">Chat</a>
                            <a className="button" href="/extensions">Download</a>
                        </div>
                    </div>
                </nav>
                {children}
            </body>
        </html>
    );
}

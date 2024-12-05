import NavBar from "@/components/navbar/navbar";
import "./globals.scss";
import Footer from "@/components/footer/footer";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'UDES - Universal Decentralized Encryption System',
    description: 'UDES can be used to encrypt anything using decentralised encryption servers. Its primary purpose is to encrypt messages on the client side to increase privacy.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}

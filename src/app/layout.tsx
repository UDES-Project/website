import NavBar from "@/components/navbar/navbar";
import "./globals.scss";
import Footer from "@/components/footer/footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <NavBar/>
                <main>
                    {children}
                </main>
                <Footer/>
            </body>
        </html>
    );
}

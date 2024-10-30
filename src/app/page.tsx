import "./page.scss";

export default function Home() {
    return (
        <>
            <div className="content-block header">
                <h1>Welcome to UDES - Universal Decentralized Encryption System</h1>
                <span>UDES offers a solution to secure your communications directly from your web browser, ensuring confidentiality, integrity, and authenticity in your exchanges. Protect your instant messages with our end-to-end encryption. Download now for maximum security.</span>
                <div>
                    <a className="button green" href="/extensions">Download</a>
                </div>
            </div>
            <div className="content-block">
                <h2>How it Works</h2>
                <span>UDES is a system that makes your messages more secure and works in two ways:
• With its own chat: You can use the UDES chat provided for you.
• With applications like WhatsApp Web or Discord: This requires Firefox and the installation of the UDES extension.

To make it work, both you and the person you're messaging need to install UDES. Here's how to proceed:

Install the UDES extension: Before starting, both of you need to download and install the UDES extension on Firefox.
Normal connection and extension activation: Log in to your usual messaging app, making sure the UDES extension is activated on Firefox.
Automatic protection: Once connected, UDES encrypts your messages to secure them. Everything happens in the background, so you don’t need to do anything.
Message visibility: Messages exchanged are automatically encrypted. Only people who have installed and activated the UDES extension can decrypt them. Others, even if they access the conversation, will not be able to read the messages without the extension and UDES’s secure servers. This way, as long as both participants are using UDES, their exchanges remain strictly private.
In summary: UDES keeps your conversations private. As long as both of you have UDES installed, your exchanges are automatically protected and remain invisible to others.</span>
            </div>
            <div className="content-block specification">
                <div className="block">
                    <img src="/static/assets/icons/privacy.png" alt="" />
                    <h3>Privacy</h3>
                    <span>Enim laboris id incididunt ullamco occaecat qui.</span>
                </div>
                <div className="block">
                    <img src="/static/assets/icons/global.png" alt="" />
                    <h3>Universality</h3>
                    <span>Enim laboris id incididunt ullamco occaecat qui.</span>
                </div>
                <div className="block">
                    <img src="/static/assets/icons/community.png" alt="" />
                    <h3>Community</h3>
                    <span>Enim laboris id incididunt ullamco occaecat qui.</span>
                </div>
            </div>
        </>
    );
}

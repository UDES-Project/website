import "./page.scss";

export default function Home() {
    return (
        <>
            <div className="content-block header">
                <h1>Universal Decentralized Encryption System <br />- UDES - </h1>
                <span>UDES offers a solution to secure your communications directly from your web browser, ensuring confidentiality, integrity, and authenticity in your exchanges. Protect your instant messages with our end-to-end encryption. Download now for maximum security.</span>
                <div>
                    <a className="button green" href="/extensions">Download</a>
                </div>
            </div>
            <div className="content-block">
                <h2>How it Works</h2>
                <span><p><strong>UDES</strong> makes your messages more secure and works in two ways:</p><br />

<p><strong>1. Using its own chat:</strong><br />
Access a secure chat provided by UDES to communicate with full confidentiality.</p><br />

<p><strong>2. With applications like WhatsApp Web or Discord:</strong><br />
This requires Firefox and the installation of the UDES extension to ensure message protection.</p><br />

<hr />

<p>To ensure security, both you and your contact need to install UDES. Here are the steps:</p><br />

<ul>
    <li><strong>Install the UDES extension:</strong><br />
        Download and install the UDES extension on Firefox for both you and your contact.</li><br />

    <li><strong>Connection and extension activation:</strong><br />
        Log in to your usual messaging app with the UDES extension activated on Firefox.</li><br />

    <li><strong>Automatic protection:</strong><br />
        Once connected, UDES encrypts your messages in the background. No further action is required.</li><br />

    <li><strong>Message visibility:</strong><br />
        Messages are encrypted and visible only to those who have installed UDES. Without the extension, even if someone accesses the conversation, the messages will remain unreadable.</li>
</ul><br />

<hr />

<p><strong>In summary:</strong><br />
UDES keeps your conversations private. As long as both you and your contact use UDES, your exchanges are automatically secured and invisible to others.</p>
</span>
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

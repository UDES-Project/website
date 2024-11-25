import "./page.scss";

export default function Home() {
    return (
        <>
            <div className="content-block header">
                <h1>Universal Decentralized Encryption System <br />- UDES - </h1>
                <span>UDES offers a solution to secure your communications directly from your web browser, ensuring confidentiality, integrity, and authenticity in your exchanges. Download now for maximum security.</span>
                <div>
                    <a className="button green" href="/extensions">Download</a>
                </div>
            </div>
            <div className="content-block">
                <h2>How it Works</h2>
                <div className="hiw-content">
                    <p><strong>UDES</strong> makes your messages more secure and works in two ways:</p><br />

                    <p><strong>1. Using our chat to communicate with full confidentiality.</strong></p>
                    <p><strong>2. With others supported applications:</strong></p><br />

                    <p>To ensure security, both you and your contact need to install UDES. Here are the steps:</p><br />

                    <ul>
                        <li><a href="/extensions">Install</a> the UDES extension.</li>
                        <li>Log in to your usual messaging app with the UDES extension activated.</li>
                        <li>Once connected, The UDES extension encrypts your messages in the background. No further action is required.</li>
                        <li>Messages are encrypted and visible only to those who have installed UDES. Without the extension, even if someone accesses the conversation, the messages will remain unreadable.</li>
                    </ul><br />
                </div>
            </div>
            <div className="content-block specification">
                <div className="block">
                    <img src="/static/assets/icons/privacy.png" alt="" />
                    <h3>Privacy</h3>
                    <span>Protect your conversations with advanced encryption that ensures the confidentiality of your exchanges. With UDES, only you and your contact have access to your messages, safeguarding your information from any potential breaches.</span>
                </div>
                <div className="block">
                    <img src="/static/assets/icons/global.png" alt="" />
                    <h3>Universality</h3>
                    <span>Communicate securely across multiple platforms. UDES adapts to popular messaging applications to provide seamless protection, no matter which communication tool you use.</span>
                </div>
                <div className="block">
                    <img src="/static/assets/icons/community.png" alt="" />
                    <h3>Community</h3>
                    <span>UDES lives thanks to the work of the community in keeping the software up to date. Join us to help users have a better experience.</span>
                </div>
            </div>
        </>
    );
}

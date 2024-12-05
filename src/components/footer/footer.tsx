import "./footer.scss"

export default function Footer() {
    return <div className="footer">
        <div className="column">
            <h2>Links</h2>
            <a href="/extensions">Extensions</a>
            <a href="/chat">Chat</a>
        </div>
        <div className="column">
            <h2>More</h2>
            <a href="https://github.com/UDES-Project">GitHub</a>
        </div>
    </div>
}
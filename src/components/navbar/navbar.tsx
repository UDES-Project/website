import "./navbar.scss"

export default function NavBar() {
    return <nav>
        <div className="bar">
            <div className="block">
                <a href="/">
                    <img src="/static/assets/logo-white.png" />
                </a>
            </div>
            <div className="block">
                <a href="/chat">Chat</a>
                <a className="button" href="/extensions">Download</a>
            </div>
        </div>
    </nav>
}
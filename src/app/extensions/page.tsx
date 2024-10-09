import "./page.scss"

export default function Page() {
    return <>
        <div className="content-block">
        <h2>Official List</h2>
        <div className="extensions">
            <div className="extension main">
                <div className="name">
                    <img src="/static/assets/icons/privacy.png" alt=""/>
                    UDES Extension
                    <span className="description">
                        Secure the official UDES Chat and manage other extensions
                    </span>
                </div>
                <div>
                    <a href="#" className="button green">Download</a>
                </div>
            </div>
            <div className="extension">
                <div className="name">
                    <img src="/static/assets/icons/privacy.png" alt=""/>
                    Test
                </div>
                <div>
                    <a href="#" className="button green">Download</a>
                </div>
            </div>
            <div className="extension">
                <div className="name">
                    <img src="/static/assets/icons/privacy.png" alt=""/>
                    Test
                </div>
                <div>
                    <a href="#" className="button green">Download</a>
                </div>
            </div>
        </div>
    </div>
</>
}
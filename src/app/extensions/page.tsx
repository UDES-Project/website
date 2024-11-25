import "./page.scss"

function Extension({ name, description, link, main }: { name: string, description: string, link: string, main?: boolean }) {
    return <div className={`extension ${main ? "main" : ""}`}>
        <div className="name">
            <img src="/static/assets/icons/privacy.png" alt="" />
            {name}
            <span className="description">
                {description}
            </span>
        </div>
        <div>
            <a target="_blank" href={link} className="button green">Download</a>
        </div>
    </div>
}

export default function Page() {
    return <>
        <div className="content-block">
            <h2>Official List</h2>
            <div className="extensions">
                <Extension name="UDES Extension" description="Secure the official UDES Chat and manage other extensions" link="https://addons.mozilla.org/en-US/firefox/addon/udes-extension/" main />
            </div>
        </div>
    </>
}
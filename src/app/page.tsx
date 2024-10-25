import "./page.scss";

export default function Home() {
    return (
        <>
            <div className="content-block header">
                <h1>AN UPDATE FOR ONLINE MESSAGE CONFIDENTIALITY</h1>
                <span>Ex consequat eiusmod deserunt sit occaecat officia elit ea. Ex consequat eiusmod deserunt sit occaecat officia elit ea.</span>
                <div>
                    <a className="button green" href="/extensions">Download</a>
                </div>
            </div>
            <div className="content-block">
                <h2>How it Works</h2>
                <span>Ea nisi nulla sit ipsum do dolor. Culpa excepteur ipsum tempor laboris deserunt mollit nisi. Reprehenderit dolore in aliquip exercitation enim ea deserunt aliquip. Cupidatat et nulla sint ullamco et. Duis veniam proident deserunt culpa excepteur do commodo qui pariatur commodo nostrud mollit. Minim sit nisi nulla veniam.</span>
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

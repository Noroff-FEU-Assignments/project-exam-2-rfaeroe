
const Footer = () => {

    return (
        <footer>
            <div className="footer-inner sectionwrapper row">
                <div className="footer-nav col col-d-3">
                    <ul className="footer-list">
                        <li className="footer-list-item">
                            <a href="/">Home</a>
                        </li>
                        <li className="footer-list-item">
                            <a href="/establishments">Establishments</a>
                        </li>
                        <li className="footer-list-item">
                            <a href="contact">Contact Us</a>
                        </li>
                        <li className="footer-list-item">
                            <a href="/login">Login</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-brand col dcol-d-3">
                    <h4>HOLIDAZE</h4>
                </div>
                <div className="footer-contact col col-d-3">
                    <ul className="footer-list">
                        <li className="footer-list-item">
                            <span>+47 60 60 60 60</span>
                        </li>
                        <li className="footer-list-item">
                            <span>contact@holidaze.com</span>
                        </li>
                        <li className="footer-list-item">
                            <span>Ulriksbakken 7, 5050 Bergen</span>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
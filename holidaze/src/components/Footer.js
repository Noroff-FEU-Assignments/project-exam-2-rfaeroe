import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <footer>
            <div className="footer-inner row">
                <div className="footer-nav col col-d-3">
                    <ul className="footer-list">
                        <li className="footer-list-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="footer-list-item">
                            <Link to="/establishments">Establishments</Link>
                        </li>
                        <li className="footer-list-item">
                            <Link to="contact">Contact Us</Link>
                        </li>
                        <li className="footer-list-item">
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-brand col col-d-3">
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
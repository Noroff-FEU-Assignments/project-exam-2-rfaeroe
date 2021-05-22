import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Nav() {
    const [auth, setAuth] = useContext(AuthContext);
    const history = useHistory();

    const [isMobile, setIsMobile] = useState(false);

    function logout() {
        setAuth(null);
        history.push('/');
    }

    return (
        <div className="navbar-wrapper">
            <nav className="navbar">
                <Link to='/' className={"nav-logo"}>
                    HOLIDAZE
                </Link>
                <ul className={isMobile ? "nav-menu-mobile" : "nav-menu"}
                    onClick={() => setIsMobile(false)}>
                    <li className="nav-item">
                        <Link
                            to='/'
                            className="nav-links"
                        >
                            Home
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to='/establishments'
                            className="nav-links"
                        >
                            Establishments
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to='/contact'
                            className="nav-links"
                        >
                            Contact
                    </Link>
                    </li>
                    {auth ? (
                        <li className="nav-item nav-item--admin">
                            <Link
                                to='/admin'
                                className="nav-links"
                            >
                                Admin
                        </Link> |{' '}
                            <button className="logout-button" onClick={logout}>Log out</button>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link
                                to='/login'
                                className="nav-links"
                            >
                                Login
                        </Link>
                        </li>
                    )}
                </ul>
                <button className="mobile-menu-icon"
                    onClick={() => setIsMobile(!isMobile)}>
                    {isMobile ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                </button>
            </nav>
        </div>
    );
}

export default Nav;
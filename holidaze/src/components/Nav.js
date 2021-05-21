import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Nav() {
    const [auth, setAuth] = useContext(AuthContext);
    const [click, setClick] = useState(false);
    const history = useHistory();

    function logout() {
        setAuth(null);
        history.push('/');
    }

    const handleClick = () => setClick(!click);
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to='/' className={"nav-logo"}>
                    HOLIDAZE
                </Link>
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                    <Link
                        to='/'
                        className="nav-links"
                        onClick={handleClick}
                    >
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to='/establishments'
                        className="nav-links"
                        onClick={handleClick}
                    >
                        Establishments
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to='/contact'
                        className="nav-links"
                        onClick={handleClick}
                    >
                        Contact
                    </Link>
                </li>
                {auth ? (
                    <li className="nav-item">
                        <Link
                            to='/admin'
                            className="nav-links"
                            onClick={handleClick}
                        >
                            Admin
                        </Link> |{' '}
                        <button onClick={logout}>Log out</button>
                    </li>
                ) : (
                    <li className="nav-item">
                        <Link
                            to='/login'
                            className="nav-links"
                            onClick={handleClick}
                        >
                            Login
                        </Link>
                    </li>
                )}
            </ul>
            <div className="nav-icon" onClick={handleClick}>
                <FontAwesomeIcon icon={faTimes} />
                <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
        </nav>
    );
}

export default Nav;
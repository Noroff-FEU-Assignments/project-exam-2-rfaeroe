import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import { FiMenu, FiX } from 'react-icons/fi';

function Nav() {
    const [auth, setAuth] = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const history = useHistory();

    function logout() {
        setAuth(null);
        history.push('/');
    }

    return (
            <nav className={"navbar"}>
                <Link to='/' className={"nav-logo"} onClick={() => setOpen(false)}>
                    HOLIDAZE
                </Link>
                <ul className={open ? 'nav-links active' : 'nav-links'}>
                    <li className="nav-item">
                        <Link to='/' className="nav-link" onClick={() => setOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/establishments' className="nav-link" onClick={() => setOpen(false)}>
                            Establishments
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/contact' className="nav-link" onClick={() => setOpen(false)}>
                            Contact
                        </Link>
                    </li>
                    {auth ? (
                        <li className="nav-item">
                            <Link to='/admin' className="nav-link" onClick={() => setOpen(false)}>
                                Admin
                            </Link> |{' '}
                            <button onClick={logout}>Log out</button>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link to='/login' className="nav-link" onClick={() => setOpen(false)}>
                                Login
                            </Link>
                        </li>
                        
                    )}

                </ul>
                
            </nav>
    );
}

export default Nav;
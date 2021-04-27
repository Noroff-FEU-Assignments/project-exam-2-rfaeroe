import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Nav() {
    const [auth, setAuth] = useContext(AuthContext);

    const history = useHistory();

    function logout() {
        setAuth(null);
        history.push('/');
    }

    return (
        <div className={"container-nav"}>
            <nav className={"wrapper"}>
                <Link to='/' className={"logo"}>HOLIDAZE</Link>
                <div className="nav-links">
                    <Link to='/'>Home</Link>
                    <Link to='/establishments'>Establishments</Link>
                    <Link to='/contact'>Contact</Link>
                    {auth ? (
                        <>
                            | <Link to='/products'>Products</Link> |{' '}
                            <Link to='/add'>Add</Link> |{' '}
                            <button onClick={logout}>Log out</button>
                        </>
                    ) : (
                        <Link to='/login'>Login</Link>
                    )}
                </div>

            </nav>
        </div>

    );
}

export default Nav;
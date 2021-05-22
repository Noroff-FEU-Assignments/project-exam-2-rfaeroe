import { useState, useContext } from 'react';
import { loginSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { AUTH_PATH, BASE_URL } from '../utils/constants';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [auth] = useContext(AuthContext);
    const [, setAuth] = useContext(AuthContext);
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async data => {
        setSubmitting(true);
        setLoginError(null);

        try {
            const response = await axios.post(`${BASE_URL}${AUTH_PATH}`, data);
            console.log('response', response.data);
            setAuth(response.data);
            if (response.status === 200) {
                history.push('/admin');
            }
        } catch (error) {
            console.log('error', error);
            setLoginError(error.toString());
        } finally {
            setSubmitting(false);
        }
    };

    if (auth) {
        history.push('/admin');
    }

    return (
        <div className={"wrapper sectionwrapper"}>
            <h1 className={"pageheading"}>Log in to your <span>Account</span></h1>
            <div className={"login-form-wrapper"} style={{ marginTop: "76px", }}>
                <form className={"form"} onSubmit={handleSubmit(onSubmit)}>
                    {loginError && <p>{loginError}</p>}
                    <fieldset disabled={submitting}>
                        <div className={"form-group"}>
                            <input name='identifier' placeholder='Username' ref={register} type='text' />
                            {errors.identifier && <p>{errors.identifier.message}</p>}
                        </div>
                        <div className={"form-group"}>
                            <input name='password' placeholder='Password' ref={register} type='password' />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        <button className={"button"} type='submit'>{submitting ? 'Loggin in...' : 'Login'}</button>
                    </fieldset>
                </form>
            </div>
        </div >
    );
};

export default Login;
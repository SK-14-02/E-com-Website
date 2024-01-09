import React, { useState, useContext } from "react";
import './login.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';

export const Login = () => {
    const AuthCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [errmsg, setErrMsg] = useState('');
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const emailHandler = (event) => {
        setUser((prevState) => {
            return {
                ...prevState,
                email: event.target.value
            }
        })
    }
    const passwordHandler = (event) => {
        setUser((prevState) => {
            return {
                ...prevState,
                password: event.target.value
            }
        })
    }
    const loginHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:4000/login", user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            localStorage.setItem('user', response.data.user);
            localStorage.setItem('token', response.data.token);
            AuthCtx.setIsLoggedIn(true);
            navigate('/');
        })
            .catch(error => {
                setErrMsg(error.response.data.message)
            })
    }
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={loginHandler}>
                {errmsg != '' &&
                    <div className="alert alert-danger">{errmsg}</div>
                }
                <h1>Login</h1>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" onChange={emailHandler} />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="addon-wrapping">#</span>
                    <input type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" onChange={passwordHandler} />
                </div>
                <div className="">
                    <input class="btn btn-primary" type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    );
}
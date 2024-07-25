import React from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onLogin = function () {
        localStorage.setItem('isloggedin', true);
        // window.location.href = "/";
        navigate("/");
    }

    return (
        <div>
            Login page <br />
            <button onClick={onLogin}> Click to login </button>
        </div>
    )
}

export default Login;
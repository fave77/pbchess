import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/auth.service';

import './confirm.css';

const confirm = AuthService.confirm;
const parameters = new URLSearchParams(window.location.search);
const id = parameters.get('userId');

const Confirm = () => {
    
    const[message, setMessage] = useState("Please wait while we verify your email.");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        confirm(id).then(response => {
            setMessage(response.msg);
            setTimeout(() => {
                setRedirect(true);
                console.log(redirect);
            }, 5000);
        })
    }, [message, redirect]);


    if(redirect){
        return <Redirect to="/login" />
    }
    return (
    <div className="container">
        <h1>{message}</h1>
        <a href={"/login"}>Click here to login.</a>
    </div>
    );

};

export default Confirm;
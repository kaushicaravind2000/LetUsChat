import { Button } from '@material-ui/core';
import { auth, provider } from "./firebase";
import React from 'react'
import "./Login.css";
import "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
function Login() {

    const [{ user }, dispatch] = useStateValue();

    const signIn = () => {
    auth.signInWithPopup(provider)
     .then((result) => {
         dispatch({
             type: actionTypes.SET_USER,
             user: result.user,
         });
     })
     .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__container">
                <div className="login__ishu">
                    {}
                </div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTfTwBLnslAwd4M6GbwkZPrRXgNajOrL_GXQ&usqp=CAU"
                alt=""
                />
                <div className="login__text">
                <h1> LETUSCHAT</h1>
                 </div>
            <Button onClick={signIn}>
                LOGIN
            </Button>
             </div>
         </div>
    )
}

export default Login;

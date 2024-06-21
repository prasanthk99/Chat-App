import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
// import { Navigate } from 'react-router';
import { useNavigate } from "react-router";

import "../Assets/Styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  async function signIn(e) {
    e.preventDefault();
    console.log(e.target);
    // const name = e.target[0].value;
    const email = e.target[0].value;
    const password = e.target[1].value;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
        setErr(true);
      });
  }

  return (
    <div className="container">
      <div className="login">
        <h1>Login</h1>
        <form action="" onSubmit={signIn} className="form">
          <div className="form-field">
            <input type="text" name="email" id="email" required/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-field">
            <input type="password" name="password" id="password" required/>
            <label htmlFor="password">Password</label>
          </div>
          <input type="submit" value="Sign-In" />
          {err && <p style={{ color: "red" }}>Something went Wrong!</p>}
          <p>
            If you don't have account? <a href="/register">Create Account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

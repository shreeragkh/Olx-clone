import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../api';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    try {
      await signInWithEmailAndPassword(auth, Email, Password);
      alert('Logged in successfully!');
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode)

      // Handle specific Firebase error codes
      if (errorCode === 'auth/user-not-found') {
        setError('No user found with this email. Please check the email or sign up.');
      } else if (errorCode === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (errorCode === 'auth/invalid-email') {
        setError('The email address is invalid.');
        
      } else if(errorCode==='auth/invalid-credential') {
        setError('Invlid credentials. Please check the email or sign up.');
      } else {
        setError('An error occurred. Please try again later.'); // Generic fallback message
      }
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {Error && <div style={{ color: 'red' }}>{Error}</div>}  {/* Display error */}
          <br />
          <button type="submit">Login</button>
        </form>
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;


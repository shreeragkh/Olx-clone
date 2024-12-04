import React ,{useState,useContext} from 'react';
import {  createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { Firebasecontex } from '../../store/firebaseContext';
import { auth } from '../../api';

export default function Signup() {
  const [Username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [Phonenumber, setPhonenumber] = useState('')
  const [Password, setPassword] = useState('')
  // const {auth} = useContext(Firebasecontex)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your sign-up logic here
    try{
      let userCredentaials = await createUserWithEmailAndPassword(auth, email, Password)
      let user = userCredentaials.user
      await updateProfile(user, {displayName: Username})
    }
    catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // seterror(getErrorString(errorMessage))
    }

  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={Phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}

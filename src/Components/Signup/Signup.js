import React ,{useState} from 'react';
import {  createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Signup.css';
// import { Firebasecontex } from '../../store/firebaseContext';
import { auth,db } from '../../api';
import { addDoc,collection,serverTimestamp } from 'firebase/firestore';
import {  useNavigate } from 'react-router-dom';

export default function Signup() {
  const [Username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [Phonenumber, setPhonenumber] = useState('')
  const [Password, setPassword] = useState('')
  const [Error, setError] = useState('')  // const {auth} = useContext(Firebasecontex)
  const [PasswordError, setPasswordError] = useState()
  const history=useNavigate()

  const validatePassword=(Password)=>{
    const minLength = 8;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if(Password.length<minLength){
      return "Password should contain minimum 8 Letters"
    }
    if(!upperCase.test(Password)){
      return "Password should contain atleast 1 Uppercase"
    }
    if(!lowerCase.test(Password)){
      return "Password should contain atleast 1 Lowercase"
    }
    if(!number.test(Password)){
      return "Password should contain atleast 1 Number"
    }
    if(!specialChar.test(Password)){
      return "Password should contain atleast 1 Special Character"
    }
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your sign-up logic here
    if (!Username || !email || !Phonenumber || !Password) {
      setError('All fields are required');
      return;
    }
    const passwordValidationerror=validatePassword(Password)
      if (passwordValidationerror){
        setPasswordError(passwordValidationerror)
      }
    try{
      let userCredentaials = await createUserWithEmailAndPassword(auth, email, Password)
      let user = userCredentaials.user
      await updateProfile(user, {displayName: Username})
      await addDoc(collection(db, "users"), {
        id: user.uid,
        user: Username,
        phone: Phonenumber,
        email:email,
        password:Password,
        time:serverTimestamp()
      })
      history('/login')
      // console.log("User created successfully")  // To identify the user is created
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
          />
          <br />
          {PasswordError && <p style={{ color: 'red' }}>{PasswordError}</p>} {/* Show password error message */}
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}

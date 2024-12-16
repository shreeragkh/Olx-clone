import React,{useContext,useEffect}  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import './App.css';
import LoginPage from './Pages/Login';
import { AuthContext } from './store/firebaseContext';
import {auth} from'./api'
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const {setUser} = useContext(AuthContext)
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  },[setUser])
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React,{useContext,useEffect}  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import './App.css';
import LoginPage from './Pages/Login';
import { AuthContext } from './store/firebaseContext';
import {auth} from'./api'
import { onAuthStateChanged } from 'firebase/auth';
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post_function from './store/postContext';


function App() {
  const {setUser} = useContext(AuthContext)
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  },[setUser])
  
  return (
    <div className="App">
      <Post_function>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<Create/>} />
          <Route path="/view/:id" element={<View/>} />
        </Routes>
      </Router>
    </Post_function>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Firebasecontex} from '../src/store/firebaseContext'
import {auth} from './api'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Firebasecontex.Provider value={{auth}}>
    <App />
    </Firebasecontex.Provider>
  </React.StrictMode>
);


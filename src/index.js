import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Auth,{Firebasecontex} from '../src/store/firebaseContext'
import {auth} from './api'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Firebasecontex.Provider value={{auth}}>
      <Auth>
      <App />
      </Auth>
    </Firebasecontex.Provider>
  </React.StrictMode>
);


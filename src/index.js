import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Auth,{Firebasecontex} from '../src/store/firebaseContext'
import {auth} from './api'
// import { PostDetailsContext } from './store/postContext';
// import {Post_function} from './store/postContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <PostDetailsContext> */}
    <Firebasecontex.Provider value={{auth}}>
      <Auth>
      <App />
      </Auth>
    </Firebasecontex.Provider>
    {/* </PostDetailsContext> */}
  </React.StrictMode>
);


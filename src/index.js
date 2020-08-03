import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import firebase from 'firebase';
import Login from './login';
import Dashboard from './dashboard';
import SignUp from './signup';
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyB4SA-FuwardpDQZk02v7SjYPB1a3hfGvA",
  authDomain: "chat-3f6d7.firebaseapp.com",
  databaseURL: "https://chat-3f6d7.firebaseio.com",
  projectId: "chat-3f6d7",
  storageBucket: "chat-3f6d7.appspot.com",
  messagingSenderId: "978478843636",
  appId: "1:978478843636:web:0a2d2576dafe0842fa00a1",
  measurementId: "G-3PN78G98J7"
});

const routing=(
  <Router>
    <div>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
    </div>
  </Router>
)

ReactDOM.render(
  <React.StrictMode>
   {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

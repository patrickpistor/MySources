import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from "react-redux-firebase";
import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";

import { Header } from "./components/Header/Header";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import Home from "./screens/Home/Home";

const firebaseConfig = {
  apiKey: "AIzaSyBx9o8T9Sh_ckfoV_mZmzB7j5l-5G_J_hU",
  authDomain: "nvn2-f261a.firebaseapp.com",
  databaseURL: "https://nvn2-f261a.firebaseio.com",
  projectId: "nvn2-f261a",
  storageBucket: "nvn2-f261a.appspot.com",
  messagingSenderId: "819076290403",
  appId: "1:819076290403:web:c4954e15930e4caf"
};

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  firebaseStateName: "firebase",
  debug: true
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const rootReducer = combineReducers({
  firebase: firebaseReducer
});

const initialState = {};

const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
};

const Routing = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Header />
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<Routing />, rootElement);

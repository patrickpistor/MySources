import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
  apiKey: "AIzaSyBx9o8T9Sh_ckfoV_mZmzB7j5l-5G_J_hU",
  authDomain: "nvn2-f261a.firebaseapp.com",
  databaseURL: "https://nvn2-f261a.firebaseio.com",
  projectId: "nvn2-f261a",
  storageBucket: "nvn2-f261a.appspot.com",
  messagingSenderId: "819076290403",
  appId: "1:819076290403:web:c4954e15930e4caf"
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export default firebase;

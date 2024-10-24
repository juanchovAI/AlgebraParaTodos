import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxyLwVOv_buLi_cIJ0XViHQC_CTgNyf6E",

  authDomain: "algebra-para-todos.firebaseapp.com",

  projectId: "algebra-para-todos",

  storageBucket: "algebra-para-todos.appspot.com",

  messagingSenderId: "811875610760",

  appId: "1:811875610760:web:c5f685ce2340d5b438af3d",

  measurementId: "G-HYEDFDKQ75",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { firebaseApp, auth, db };

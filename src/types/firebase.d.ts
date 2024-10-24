declare module "./firebase" {
  import firebase from "firebase/app";
  import "firebase/auth";
  import "firebase/firestore";

  export const firebaseApp: firebase.app.App;
  export const auth: firebase.auth.Auth;
  export const db: firebase.firestore.Firestore;
}

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyBu_NT4BiMUvuYdohqLvFJQYOErvWgL4O8",
    authDomain: "kindafire.firebaseapp.com",
    projectId: "kindafire",
    storageBucket: "kindafire.appspot.com",
    messagingSenderId: "551461207026",
    appId: "1:551461207026:web:601fcfc156882b55be896b"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const functions = firebase.functions();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();

  export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

  export const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  export const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  export const googleSignup = () => {
    const provider = new firebase.auth.GoogleAuthProvider();  
    return auth.signInWithPopup(provider);
  }

  export const signOut = () => {
    auth.signOut();
  }

  export const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  }

export default firebase;
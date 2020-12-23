import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore"
import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyALG0CgqxndzNskmULMyNzguBqPj0bP77Q",
  authDomain: "kindatesting.firebaseapp.com",
  databaseURL: "https://kindatesting.firebaseio.com",
  projectId: "kindatesting",
  storageBucket: "kindatesting.appspot.com",
  messagingSenderId: "1088302674191",
  appId: "1:1088302674191:web:e94d1eabf8da869eed8e7a"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // firebase.functions().useEmulator("localhost", 5001);
  // firebase.auth().useEmulator("http://localhost:9099");

  export const auth = firebase.auth();
  export const functions = firebase.functions();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();

  export const signUp = async (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  export const signIn = async (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // var actionCodeSettings = {
  //   // The URL to redirect to for sign-in completion. This is also the deep
  //   // link for mobile redirects. The domain (www.example.com) for this URL
  //   // must be whitelisted in the Firebase Console.
  //   url: 'http://localhost:8080/test',
  //   handleCodeInApp: true
  // }

  // export const signInEmailLink = async (email) => {
  //   var applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container'); 
      
  //   return auth.signInWithPhoneNumber("+923080073024", applicationVerifier);
  // }



  export const signOut = () => {
    auth.signOut();
  }


export default firebase;
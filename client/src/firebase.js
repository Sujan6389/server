
import firebase from 'firebase/app';
import 'firebase/firebase-auth';

const firebaseConfig = {
  apiKey: "AIzaSyB2HyuLeFa-L5fP9WRxYXjY0zLJVcN3Xlw",
  authDomain: "summerproject-f033e.firebaseapp.com",
  projectId: "summerproject-f033e",
  storageBucket: "summerproject-f033e.appspot.com",
  messagingSenderId: "614933473218",
  appId: "1:614933473218:web:53686841e11d86d0db185b",
  measurementId: "G-DVWXWNPLXC"
  }; 
  
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
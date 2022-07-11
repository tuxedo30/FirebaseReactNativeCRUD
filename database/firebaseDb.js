//import * as firebase from 'firebase';
//import firestore from 'firebase/firestore'
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAQMsonAlzTriQObHxIIbCg3V_Y3F5z1tA",

  authDomain: "reactnativecrud-6faf9.firebaseapp.com",

  projectId: "reactnativecrud-6faf9",

  storageBucket: "reactnativecrud-6faf9.appspot.com",

  messagingSenderId: "1035644848141",

  appId: "1:1035644848141:web:e92484b3e699b2a1e16d44"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
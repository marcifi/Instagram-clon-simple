import  firebase from  'firebase/app';
import 'firebase/firestore' 

const firebaseConfig = {
    apiKey: "AIzaSyDrVoGPEAu1rxjyeL2w6F8L2c_duduFRRQ",
    authDomain: "insta-test-5c0ed.firebaseapp.com",
    databaseURL: "https://insta-test-5c0ed.firebaseio.com",
    projectId: "insta-test-5c0ed",
    storageBucket: "insta-test-5c0ed.appspot.com",
    messagingSenderId: "242558036775",
    appId: "1:242558036775:web:f41d6c8cf55dabd75d9702"
  };

  //inicialización de firebase
  const fb = firebase.initializeApp(firebaseConfig)
  export const db = fb.firestore();
import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyA_0bgtr_FcxNVp3OsIg_lvwXMwBK0aJdQ",
    authDomain: "bt3103-week-6-9cea9.firebaseapp.com",
    projectId: "bt3103-week-6-9cea9",
    storageBucket: "bt3103-week-6-9cea9.appspot.com",
    messagingSenderId: "327052532181",
    appId: "1:327052532181:web:ebbeecac2584d246fc855c"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;


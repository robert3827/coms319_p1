// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSoO_j3Fa5XFUonzunXoXzr9D1idmUttU",
    authDomain: "coms319-finalproject.firebaseapp.com",
    projectId: "coms319-finalproject",
    storageBucket: "coms319-finalproject.appspot.com",
    messagingSenderId: "285011931758",
    appId: "1:285011931758:web:ff24eac18bbfb5cd42ac7f",
    measurementId: "G-1CTXQPBP2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
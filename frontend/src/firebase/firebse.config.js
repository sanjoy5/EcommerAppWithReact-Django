// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjnwhNF2n2cLl-1hRq33TxPmXAmPFrs5M",
    authDomain: "rd-shop-fcced.firebaseapp.com",
    projectId: "rd-shop-fcced",
    storageBucket: "rd-shop-fcced.appspot.com",
    messagingSenderId: "839065336668",
    appId: "1:839065336668:web:9f7a47a1ace926ced6df99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
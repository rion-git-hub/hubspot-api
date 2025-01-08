import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC-UALLhDBwUhxiPGJNjAf4Wqs7Jm3tzcg",
    authDomain: "hubspot-app-b1cce.firebaseapp.com",
    projectId: "hubspot-app-b1cce",
    storageBucket: "hubspot-app-b1cce.firebasestorage.app",
    messagingSenderId: "677471020770",
    appId: "1:677471020770:web:361b767d61e014a34ca0bb"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }
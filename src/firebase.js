// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXjA4QIZDR1Nv5IkQv7vmuYz6z5zt_1FI",
    authDomain: "cvresumegen-f3535.firebaseapp.com",
    projectId: "cvresumegen-f3535",
    storageBucket: "cvresumegen-f3535.appspot.com",
    messagingSenderId: "489317314534",
    appId: "1:489317314534:web:03c0731f42c345e653f027",
    measurementId: "G-EQV1XND457"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;
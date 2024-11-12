// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_a7rgkgqQFYgogfzcwH7gSvaXxgvjPbA",
  authDomain: "fir-auth-react-native-16887.firebaseapp.com",
  projectId: "fir-auth-react-native-16887",
  storageBucket: "fir-auth-react-native-16887.firebasestorage.app",
  messagingSenderId: "831742397986",
  appId: "1:831742397986:web:23b6167734bdfe0800447b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);  
export const auth = initializeAuth(app)

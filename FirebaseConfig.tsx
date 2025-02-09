// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD_a7rgkgqQFYgogfzcwH7gSvaXxgvjPbA",
//   authDomain: "fir-auth-react-native-16887.firebaseapp.com",
//   projectId: "fir-auth-react-native-16887",
//   storageBucket: "fir-auth-react-native-16887.firebasestorage.app",
//   messagingSenderId: "831742397986",
//   appId: "1:831742397986:web:23b6167734bdfe0800447b"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB4J7mQSBAm2jj44qIrIzVI01f2Gb_aqoI",
  authDomain: "celiac-community-app.firebaseapp.com",
  projectId: "celiac-community-app",
  storageBucket: "celiac-community-app.firebasestorage.app",
  messagingSenderId: "1029383860447",
  appId: "1:1029383860447:web:88981c42f786688a42f96a"
};

// Initialize Firebase  
export const app = initializeApp(firebaseConfig);  
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
}) 

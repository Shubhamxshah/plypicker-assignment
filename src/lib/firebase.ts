// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAidM_tcSpJxMsml25me2CP7FHrirhiFk8",
  
  authDomain: "plypicker-assignment.firebaseapp.com",

  projectId: "plypicker-assignment",

  storageBucket: "plypicker-assignment.appspot.com",

  messagingSenderId: "353107380859",

  appId: "1:353107380859:web:46aba05c46aa9651dbb0de",

  measurementId: "G-NEZJPJ1TQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app, storage };
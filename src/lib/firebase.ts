// utils/firebase.ts
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyAidM_tcSpJxMsml25me2CP7FHrirhiFk8",
  
    authDomain: "plypicker-assignment.firebaseapp.com",
  
    projectId: "plypicker-assignment",
  
    storageBucket: "plypicker-assignment.appspot.com",
  
    messagingSenderId: "353107380859",
  
    appId: "1:353107380859:web:46aba05c46aa9651dbb0de",
  
    measurementId: "G-NEZJPJ1TQP"
  
  };
  

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};
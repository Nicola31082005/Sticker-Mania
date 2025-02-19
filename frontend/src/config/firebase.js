import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDh3uT2Ohr7xBkf9L9PseQ6uMumI7Xiw-A",
  authDomain: "mystery-box-project.firebaseapp.com",
  projectId: "mystery-box-project",
  storageBucket: "mystery-box-project.firebasestorage.app",
  messagingSenderId: "1058063570104",
  appId: "1:1058063570104:web:f241d1bd55ea1ee39dd04d"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

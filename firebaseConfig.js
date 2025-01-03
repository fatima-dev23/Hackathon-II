// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxdXlSxcdUy2CJ6VQc6S_U6fXAYGsX304",
  authDomain: "blog-app-4f0a6.firebaseapp.com",
  projectId: "blog-app-4f0a6",
  storageBucket: "blog-app-4f0a6.firebasestorage.app",
  messagingSenderId: "743667522909",
  appId: "1:743667522909:web:ee4620158b6df576815cb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app)
console.log(db);

export {db, collection, addDoc  }

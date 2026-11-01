import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

export { ref, push, set, onValue };
   
 import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
  } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
  export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};

// =========================
// CONFIGURAÇÕES FIREBASE
// =========================
   
  const firebaseConfig = {
    apiKey: "AIzaSyCPCMFfDv3m51Rfru5Ktbzpfuut9RWXyoM",
    authDomain: "tassius-tarefas.firebaseapp.com",
    projectId: "tassius-tarefas",
    storageBucket: "tassius-tarefas.firebasestorage.app",
    messagingSenderId: "757014275744",
    appId: "1:757014275744:web:21f0f4a28c03894c24cbc5",
    measurementId: "G-HEMT8NZ1YB"
  };

// =========================
// CONEXÃO FIREBASE
// =========================
   
  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
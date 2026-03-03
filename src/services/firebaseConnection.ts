
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';  
import {getAuth} from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyAqJWcsdMBkUEo2yYTjB0hXPOw9pdwClE8",
  authDomain: "reactlink-3676c.firebaseapp.com",
  projectId: "reactlink-3676c",
  storageBucket: "reactlink-3676c.firebasestorage.app",
  messagingSenderId: "553337334265",
  appId: "1:553337334265:web:d6761e1790d771d3d5b528"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// instancia de autentifação, para fazer login, cadastro, etc. 
const auth = getAuth(app); 

// conexão com o banco de dados, salvar, buscar, atualizar, deletar 
const db = getFirestore(app); 

export {auth, db}; 
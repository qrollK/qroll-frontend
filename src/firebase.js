import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAdmnmCPdWrUnCTxbOzmzLWOF3o2RlPAyo",
  authDomain: "qroll-app.firebaseapp.com",
  projectId: "qroll-app",
  storageBucket: "qroll-app.firebasestorage.app",
  messagingSenderId: "963943594712",
  appId: "1:963943594712:web:c8fe65533804032e51b5ad"
};

export const app = initializeApp(firebaseConfig);
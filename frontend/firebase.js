import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCld7m_BjIKqyeV8SXqm4nE-lc5SksheMQ",
  authDomain: "kutezadmin.firebaseapp.com",
  projectId: "kutezadmin",
  storageBucket: "kutezadmin.appspot.com",
  messagingSenderId: "318144111310",
  appId: "1:318144111310:web:b3716a80dba5a72986a69f",
  measurementId: "G-QZPT7V9KZB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

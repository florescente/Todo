import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'todo-7b7a4.firebaseapp.com',
  projectId: 'todo-7b7a4',
  storageBucket: 'todo-7b7a4.appspot.com',
  messagingSenderId: '929946635850',
  appId: '1:929946635850:web:8cfa17f3ad54ca59cda0b3',
  measurementId: 'G-SLFNMFELFN',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db

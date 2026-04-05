import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "matrix-4f53a",
  "appId": "1:437673456419:web:205821af0fdd2beed6d296",
  "storageBucket": "matrix-4f53a.firebasestorage.app",
  "apiKey": "AIzaSyBZBCHksO9KXZEl3jF8F1UiQFvMzJwSm78",
  "authDomain": "matrix-4f53a.firebaseapp.com",
  "messagingSenderId": "437673456419",
  "measurementId": "G-Y0Q37VXFBH",
  "projectNumber": "437673456419",
  "version": "2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

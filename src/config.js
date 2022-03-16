
// import firebase from 'firebase';
// import 'firebase/storage'
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey:  process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain:  process.env.REACT_APP_FIREBASE_authDomain,
  projectId:  process.env.REACT_APP_FIREBASE_projectId,
  storageBucket:  process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId:  process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId:  process.env.REACT_APP_FIREBASE_appId,
  measurementId:  process.env.REACT_APP_FIREBASE_measurementId
};

export const app = initializeApp(firebaseConfig);
// export const db = firebase.firestore()
export const storage = getStorage(app);
import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true)


  function signup (email, password) {
    try {
      return createUserWithEmailAndPassword (auth, email, password)
    // .then((userCredential) => {
    //   // Signed in 
    //   const user = userCredential.user;
    //   console.log (userCredential);
    //   // ...
    // })
    // .catch((error) => {
    //   console.log (error);
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log (errorCode + " " + errorMessage)
    //   // ..
    // });
  
    } catch (e) {console.log (e)}
  }

  function login (email, password) {
    try {
      // return signInWithEmailAndPassword (auth, email, password)
      return auth.signInWithEmailAndPassword (email, password)
    } catch (e) {console.log (e)}
  }

  function logout () {
    try {
      // return signInWithEmailAndPassword (auth, email, password)
      return auth.signOut ()
    } catch (e) {console.log (e)}
  }

  // onAuthStateChanged(auth, (user) => {
  auth.onAuthStateChanged(user => {
    setCurrentUser(user);
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false)
    })
    return unsubscribe;
  }, []);


  const value = {
    currentUser,
    signup,
    login,
    logout
  }
  return (
    <AuthContext.Provider value={value}>
      { ! loading && children }

    </AuthContext.Provider>
  )
}

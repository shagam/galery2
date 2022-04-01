import React, { useState } from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// import Title from './comps/Title';
// import UploadForm from './comps/UploadForm'
import ImageGrid from './comps/ImageGrid';
// import Modal from './comps/Modal'

import './App.css';

import { AuthProvider } from './contexts/AuthContext';
// import PrivateRoute from './auth/PrivateRoute';

import Signup from './auth/Signup';
import Dashboard from './Dashboard'
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import UpdateProfile from './auth/UpdateProfile';

import {getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider}  from 'firebase/auth'
import {auth} from './firebaseConfig'

// import {facebookProvider, googleProvider} from "./auth/AuthMethods"
// import SocialMediaAuth  from './auth/Auth';


function App() { 
 
  const facebookButton = async  () => {
    const provider = new FacebookAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
    .then((result => {
      console.log(result)
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = provider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

    }))
    .catch((error) => {
      console.log(error.message)
       // Handle Errors here.
       const errorCode = error.code;
       const errorMessage = error.message;
       // The email of the user's account used.
       const email = error.email;
       // The AuthCredential type that was used.
      //  const credential = provider.credentialFromError(error);
    })
  }

  const googleButton = async  () => {
    const provider = new GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
         // This gives you a Google Access Token. You can use it to access the Google API.
         const credential = provider.credentialFromResult(result);
         const token = credential.accessToken;
         // The signed-in user info.
         const user = result.user;
         console.log(result)
    })
    .catch((error) => { 
      console.log(error.message)
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          // const credential = provider.credentialFromError(error); 
    })
  }


  const adminsEmail = {
    dina: process.env.REACT_APP_FIREBASE_dina,
    test: process.env.REACT_APP_FIREBASE_test,
    shlomit: process.env.REACT_APP_FIREBASE_shlomit
  }
  // console.log (admins.dina, admins.test, admins.shlomit)

  const admins = [
    {galery: "dina Goldstein", email: adminsEmail.dina},
    {galery: "test", email: adminsEmail.test},
    {galery: "shlomit teff", email: adminsEmail.shlomit}
  ]
  

  return (
    <div>
      {/* fb app id 339984971431912     507755754172582  */}
      {/* edf5257d68c415d14740754eaee029e1  8e9c701f67e523ab4e950709a41a777a */}
      {/* https://galery-58c6a.firebaseapp.com/__/auth/handler */}
      {/*  google auth project project-830819266596 */}


      <header className='App-header_'>
        <button onClick={() => facebookButton ()}>facebook sign in</button>
        <button onClick={() => facebookButton ()}>google sign in</button>
      </header>

        <Container  className='d-flex align-items-center justify-content-center'
          style={{minHeight: "50vh"}}
        >
          <div>
            <Router>
              <AuthProvider>
                <Routes>

                    <Route exact path ="/dashBoard" element={<Dashboard/>}/>
                    {/* <Route path="/" element={<Dashboard/>}   /> */}

                    <Route path="/signup" element={<Signup/> } />
                    <Route path="/login" element={<Login/> }/>
                    <Route path="/forgotPassword" element={<ForgotPassword />}/>
                    <Route path="/update-profile" element={<UpdateProfile  />}/>


                    <Route path="/" element={<ImageGrid galery={admins[0].galery}  adminEmail={admins[0].email}  />} />
                    <Route path="/dina" element={<ImageGrid galery={admins[0].galery}  adminEmail={admins[0].email}  />} />

                    <Route path="/shlomit" element={<ImageGrid galery={admins[1].galery}  adminEmail={admins[1].email}  />} />
                    <Route path="/test" element={<ImageGrid  galery={admins[2].galery}  adminEmail={admins[2].email} />}  />
                </Routes>
              </AuthProvider>
            </Router>

          </div>

        </Container>
     </div>
  );
}

export default App;

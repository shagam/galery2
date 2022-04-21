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
import Dashboard from './auth/Dashboard'
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import UpdateProfile from './auth/UpdateProfile';

import {getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider}  from 'firebase/auth'
import {auth} from './firebaseConfig'

// import {facebookProvider, googleProvider} from "./auth/AuthMethods"
// import SocialMediaAuth  from './auth/Auth';


function App() { 
 
  
  const adminsEmail = {
    dina: process.env.REACT_APP_FIREBASE_dina,
    eli: process.env.REACT_APP_FIREBASE_eli,
    // shlomit: process.env.REACT_APP_FIREBASE_shlomit
  }
  // console.log (admins.dina, admins.test, admins.shlomit)

  const admins = [
    {galery: "dina", name: "Dina Goldstein", email: adminsEmail.dina},
    {galery: "test",  name: "test", email: adminsEmail.eli},
    // {galery: "shlomit teff", email: adminsEmail.shlomit}
  ]
  

  return (
    <div>
      {/* fb app id 339984971431912     507755754172582  */}
      {/* edf5257d68c415d14740754eaee029e1  8e9c701f67e523ab4e950709a41a777a */}
      {/* https://galery-58c6a.firebaseapp.com/__/auth/handler */}
      {/*  google auth project project-830819266596 */}

      <Container  className='d-flex align-items-left justify-content-left' style={{minHeight: "50vh", minWidth: "100%"}}
        >
          <div>
            <Router>
              <AuthProvider>
                <Routes>

                    <Route exact path ="/dashBoard"  element={<Dashboard admins= {admins}/>}/>
                    {/* <Route path="/" element={<Dashboard/>}   /> */}

                    <Route path="/signup" element={<Signup/> } />
                    <Route path="/login" element={<Login/> }/>
                    <Route path="/forgotPassword" element={<ForgotPassword />}/>
                    <Route path="/update-profile" element={<UpdateProfile  />}/>


                    <Route path="/" element={<ImageGrid galery={admins[0].galery} name={admins[0].name} adminEmail={admins[0].email}  />} />
                    <Route path="/dina" element={<ImageGrid galery={admins[0].galery} name={admins[0].name} adminEmail={admins[0].email} />} />
                    <Route path="/test" element={<ImageGrid  galery={admins[1].galery} name={admins[1].name} adminEmail={admins[1].email} />}/>                    
                    {/* <Route path="/shlomit" element={<ImageGrid galery={admins[2].galery}  adminEmail={admins[2].email}  />} /> */}

                </Routes>
              </AuthProvider>
            </Router>

          </div>

        </Container>
     </div>
  );
}

export default App;

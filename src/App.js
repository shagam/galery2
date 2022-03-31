import React, { useState } from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// import Title from './comps/Title';
// import UploadForm from './comps/UploadForm'
import ImageGrid from './comps/ImageGrid';
// import Modal from './comps/Modal'

import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

import Signup from './auth/Signup';
import Dashboard from './Dashboard'
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import UpdateProfile from './auth/UpdateProfile';

function App() { 

  const adminsEmail = {
    dina: process.env.REACT_APP_FIREBASE_dina,
    test: process.env.REACT_APP_FIREBASE_test,
    shlomit: process.env.REACT_APP_FIREBASE_shlomit
  }
  // console.log (admins.dina, admins.test, admins.shlomit)

  const admins = [
    {galery: "dina", email: adminsEmail.dina},
    {galery: "test", email: adminsEmail.test},
    {galery: "shlomit", email: adminsEmail.shlomit}
  ]
  

  return (
    <div>
      {/* <Title/> */}

        <Container  className='d-flex align-items-center justify-content-center'
          style={{minHeight: "50vh"}}
        >
          <div>
            <Router>
              <AuthProvider>
                <Routes>

                    <Route exact path ="/dashBoard" element={<Dashboard/>}/>
                    <Route path="/" element={<Dashboard/>}   />

                    <Route path="/signup" element={<Signup/> } />
                    <Route path="/login" element={<Login/> }/>
                    <Route path="/forgotPassword" element={<ForgotPassword />}/>
                    <Route path="/update-profile" element={<UpdateProfile  />}/>


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

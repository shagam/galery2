import React, { useState } from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Title from './comps/Title';
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

  return (
    <div>
      <Title/>

        <Container  className='d-flex align-items-center justify-content-center'
          style={{minHeight: "50vh"}}
        >
          <div>
            <Router>
              <AuthProvider>
                <Routes>

                    <Route exact path ="/dashBoard" element={<Dashboard/>}/>
                    <Route path="/signup" element={<Signup/> } />
                    <Route path="/login" element={<Login/> }/>

                    <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                    <Route path="/update-profile" element={<UpdateProfile/>}/>
                    <Route path="/" element={<ImageGrid/>} />
                </Routes>
              </AuthProvider>
            </Router>

          </div>

        </Container>
     </div>
  );
}

export default App;

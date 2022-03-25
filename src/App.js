import React, { useState } from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Title from './comps/Title';
// import UploadForm from './comps/UploadForm'
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal'

import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

import Signup from './auth/Signup';
import Dashboard from './Dashboard'
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import UpdateProfile from './auth/UpdateProfile';

function App() { 
  // const [loadedFiles, setLoadedFiles] = useState ([]);
  const [allDocs, setAllDocs] = useState([]);

  const [admin, setAdmin] = useState (true);


  return (
    <div>
      <Title/>
        { admin && <div> admin </div> }
        <Container  className='d-flex align-items-center justify-content-center'
          style={{minHeight: "100vh"}}
        >
          <div className='w-100' style={{ maxWidth: '400px' }}>

            <Router>
              <AuthProvider>
                <Routes>

                    <Route exact path ="/" element={<Dashboard/>}/>
                    <Route path="/signup" element={<Signup/> } />
                    <Route path="/login" setAdmin={setAdmin} element={<Login/> }/>

                    <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                    <Route path="/update-profile" element={<UpdateProfile/>}/>

                </Routes>
              </AuthProvider>
            </Router>

          </div>

        </Container>


        <div>
          <ImageGrid setAllDocs = {setAllDocs} admin = {admin} />

        </div>
    </div>
  );
}

export default App;

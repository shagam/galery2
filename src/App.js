import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

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

import DinaCV from './cv/DinaCV'
import Exibitions from './cv/Exibitions'
import { Represent } from "./comps/Represent";

// import { signInWithPopup, FacebookAuthProvider, GoogleAuthProvider}  from 'firebase/auth'
// import {auth} from './firebaseConfig'

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
    {gallery: "dina", name: "Dina Goldstein", email: adminsEmail.dina},
    {gallery: "test",  name: "test", email: adminsEmail.eli},
  ]
    const categoryList =['', 'Landscape', 'Building', 'Fabrique','Stickers','Fruits', 'Other']

  return (
    <div>
      {/* <Represent docs={docs} setCategory={setCategory}/> */}
      {/* fb app id 339984971431912     507755754172582  */}
      {/* edf5257d68c415d14740754eaee029e1  8e9c701f67e523ab4e950709a41a777a */}
      {/* https://galery-58c6a.firebaseapp.com/__/auth/handler */}
      {/*  google auth project project-830819266596 */}
      <h2 style={{color:'green'}}> &nbsp; Image Gallery  </h2>
      <Container  className='d-flex align-items-left justify-content-left' style={{minHeight: "50vh", minWidth: "100%"}}  >
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

                    <Route path="/" element={<ImageGrid gallery={admins[0].gallery} 
                    name={admins[0].name} adminEmail={admins[0].email} category={categoryList[0]} />} />

                    <Route path="/Landscape" element={<ImageGrid  gallery={admins[1].gallery}
                     name={admins[1].name} adminEmail={admins[1].email} category={categoryList[1]}/>}/>                    
                    
                    <Route path="/Building" element={<ImageGrid  gallery={admins[1].gallery}
                     name={admins[1].name} adminEmail={admins[1].email} category={categoryList[2]}/>}/> 
                    
                    <Route path="/Fabrique" element={<ImageGrid  gallery={admins[1].gallery}
                     name={admins[1].name} adminEmail={admins[1].email} category={categoryList[3]}/>}/> 
                    
                    <Route path="/Stickers" element={<ImageGrid  gallery={admins[1].gallery}
                     name={admins[1].name} adminEmail={admins[1].email} category={categoryList[4]}/>}/> 
                    
                    <Route path="/Fruits" element={<ImageGrid  gallery={admins[1].gallery}
                     name={admins[1].name} adminEmail={admins[1].email} category={categoryList[5]}/>}/> 

                    <Route path="/dina_cv" element={<DinaCV />}/>                    
                    <Route path="/exibitions" element={<Exibitions />}/>  

                </Routes>
              </AuthProvider>
            </Router>

          </div>

        </Container>
     </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Title from './comps/Title';
// import UploadForm from './comps/UploadForm'
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal'

import './App.css';
import Signup from './auth/Signup';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './Dashboard'


function App() { 
  // const [loadedFiles, setLoadedFiles] = useState ([]);
  const [allDocs, setAllDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState (null)
  const [admin, setAdmin] = useState (true);


  return (
    <div>
      <Title/>
  
      <AuthProvider>
        <Container  className='d-flex align-items-center justify-content-center'
          style={{minHeight: "100vh"}}
        >
          <div className='w-100' style={{ maxWidth: '400px' }}>
            <Router>

                {/* <Switch>
                  <Route exact path ="/" component={Dashboard}/>
                  <Route path="/signup" component={Signup }/>
                </Switch> */}

            </Router>

            <Signup />
          </div>

        </Container>
        </AuthProvider>


      {/* <h3> images: {allDocs.length} </h3> */}
      {/* <UploadForm setLoadedFiles = {setLoadedFiles} /> */}
      <ImageGrid  setSelectedDoc={setSelectedDoc} setAllDocs = {setAllDocs} admin = {admin} />
      {selectedDoc && <Modal selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc}/> }

    </div>
  );
}

export default App;

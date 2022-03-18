import React from 'react';
// import { app, projectStorage } from '../config.js'
// import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"

import UploadForm from './comps/UploadForm'
// import Title from './comps/Title';
// import UploadForm from './comps/UploadForm';

import './App.css';


function App() { 

  return (
    <div>
      <UploadForm/>
      <ul>
        {/* {users.map(user => {
          return <li key={user.name}>
             <img with="100" hight="100" src ={user.avatar} alt={user.name} />
          <p>user.name</p></li>
        })} */}
      </ul>
    </div>
  );
}

export default App;

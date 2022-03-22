import React, {useState} from 'react';

import Title from './comps/Title';
import UploadForm from './comps/UploadForm'
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal'

import './App.css';


function App() { 
  const [selectedImg, setSelectedImg] = useState (null)
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState (null)

  return (
    <div>
      <Title/>
      <UploadForm/>
      <ImageGrid  setSelectedDoc={setSelectedDoc} setDocs = {setDocs} />
      {selectedDoc && <Modal selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc}/> }
    </div>
  );
}

export default App;

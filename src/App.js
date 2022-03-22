import React, {useState} from 'react';

import Title from './comps/Title';
import UploadForm from './comps/UploadForm'
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal'

import './App.css';


function App() { 
  const [loadedFiles, setLoadedFiles] = useState ([]);
  const [allDocs, setAllDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState (null)

  return (
    <div>
      <Title/>
      <h3> images: {allDocs.length} </h3>
      <UploadForm setLoadedFiles = {setLoadedFiles} />
      <ImageGrid  setSelectedDoc={setSelectedDoc} setAllDocs = {setAllDocs} loadedFiles = {loadedFiles} />
      {selectedDoc && <Modal selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc}/> }
    </div>
  );
}

export default App;

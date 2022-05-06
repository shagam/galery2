import React, { useState, useEffect } from "react";

import { db, app, projectStorage } from '../firebaseConfig'
// import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../contexts/AuthContext';
// import {Document, Page, pdgjs} from 'react-pdf';

import UploadForm from './UploadForm'
import Modal from "./Modal";
import ImageTable from '../table/ImageTable'
import GlobalFilter from '../table/GlobalFilter'


const ImageGrid = (props) => {
  const [docs, setDocs] = useState([]);
  const [docsFiltered, setDocsFiltered] = useState([]);

  const firebaseCollection = props.galery;
  const picturesRef = collection(db, props.galery);
  const [selectedDoc, setSelectedDoc] = useState (null)
  const { login, currentUser, admin } = useAuth();
  const [error, setError] = useState();
  const [globalFilter, setGlobalFilter] = useState();
  const [tableFlag, setTableFlag] = useState(false);

  const getPictures = async () => {
    try {
      let documents = [];
      const unsub =  await getDocs (picturesRef);

      for (let i = 0; i < unsub.docs.length; i++) {
        const doc = unsub.docs[i].data();
        if (doc.fileName === undefined)  // empty document?
          continue;
        const id = unsub.docs[i].id;
        documents.push({...doc, id: id})
      }
      console.log ('getPictuires ', documents.length)
      setDocs (documents);
      // setAllDocs (documents);
      console.log (documents);
      return unsub;
    } catch (e) {setError(e.message) && console.log (e)}

  }

  useEffect (() => {
    getPictures ();
  }, []);

  useEffect (() => {
    var list = [];
    for (let i = 0; i < docs.length; i++) {
      if (filter(docs[i]))
        list.push(docs[i]);
    }
    setDocsFiltered(list);

  }, [docs, globalFilter]);

  function filterCase (str) {
    if (str === undefined || str === null)
      return true;
    if (globalFilter === undefined || globalFilter === null)
      return true;
    return str.toUpperCase().includes(globalFilter.toUpperCase());
  }


  const filter = (doc) => {
    if (globalFilter === undefined || globalFilter === '')
      return true;
    if (doc.fileName !== undefined && filterCase(doc.fileName))
      return true;
    if (doc.category !== undefined && doc.category !== null &&  filterCase(doc.category))
      return true;
    if (doc.descrition !== undefined && doc.descrition !== null && filterCase(doc.descrition))
      return true;
    if (doc.technique !== undefined && doc.technique !== null && filterCase(doc.technique))
      return true;      
    return false;
  }

  const tableFlagChange = () => {setTableFlag (! tableFlag)}

  return (
    <div >
      <h2>Image Gallery  <strong> {props.name}</strong>   ({docs.length})  </h2>

      <div style={{display:'flex'}}>
        {currentUser && <div><strong> </strong>  {currentUser.email}</div> }
        {admin && <div> &nbsp; <strong>(admin) </strong> </div>}
        &nbsp; &nbsp;  <Link to="/dashboard" > DashBoard (Login) </Link>
      </div>

      <hr/>

      {(admin || false) && ! selectedDoc && <UploadForm getPictures = {getPictures} galery = {props.galery}/> }
      {error && <div className='error'>{error}</div>}

      <div>  <input
              type="checkbox" checked={tableFlag}
              onChange={tableFlagChange}/> table
      </div>
    
    {! tableFlag && <div>
      <GlobalFilter className="stock_button_class" filter={globalFilter} setFilter={setGlobalFilter}  />
      { docs && <h3> &nbsp; <strong> Click image to focus </strong> </h3>}


 
      <div className="img-grid">

      {! selectedDoc && docsFiltered && docsFiltered.map(doc => (
        <div key={doc.fileName}>        
          <div className="img-wrap" key={doc.id}
            onClick={() => setSelectedDoc(doc)} >
            {(doc.fileType === 'image/jpeg' || doc.fileType === 'image/png') &&
              <img src={doc.fileUrl} alt={doc.fileName} />}
            {doc.fileType === 'application/pdf' &&
              <iframe src={doc.fileUrl} title={doc.fileName} />   }
          </div>
          <div  style={{display:'flex'}}>
            <h5 style={{color:'magenta', 'fontSize':'1.8vw'}}> {doc.fileName}  &nbsp;  </h5>
            <h5 style= {{'fontSize':'1.5vw' }}> {doc.category} &nbsp; {doc.technique} &nbsp; {doc.size} </h5>
          </div>
        </div> 
      ))}
      </div>
      </div>}


      {selectedDoc && <Modal selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc}/> }

      { ! selectedDoc && tableFlag && <ImageTable docs={docs} setSelectedDoc={setSelectedDoc} getPictures = {getPictures} galery = {props.galery} admin = {admin} />}
      <hr/>  
    </div>
  )
}

export default ImageGrid;
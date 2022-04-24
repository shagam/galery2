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

  const firebaseCollection = props.galery;
  const picturesRef = collection(db, props.galery);
  const [selectedDoc, setSelectedDoc] = useState (null)
  const { login, currentUser, admin } = useAuth();
  const [error, setError] = useState();
  const [globalFilter, setGlobalFilter] = useState();


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


  const filter = (doc) => {
    if (! doc)
      return true;
    if (globalFilter === undefined || globalFilter === '')
      return true;
    if (doc.fileName !== undefined && doc.fileName.includes(globalFilter))
      return true;
    if (doc.category !== undefined && doc.category.includes(globalFilter))
      return true;      
    if (doc.descrition !== undefined && doc.descrition.includes(globalFilter))
      return true;
    return false;
  }

  return (
    <div >
      <h2>Image Gallery  <strong> {props.name}</strong>   ({docs.length})  </h2>

      <div style={{display:'flex'}}>
        {currentUser && <div><strong>Email: </strong> &nbsp; &nbsp; {currentUser.email}</div> }
        {admin && <div> &nbsp; <strong>(admin) </strong> </div>}
      </div>
      <div className='w-100 text-left mt-2'>
        Need admin access? <Link to="/dashboard" > DashBoard (Login) </Link>
      </div>

      <hr/>

      {<UploadForm getPictures = {getPictures} galery = {props.galery}/> }
      {error && <div className='error'>{error}</div>}
      { docs && <h3> &nbsp; <strong> Choose an image to focus </strong> </h3>}
      <GlobalFilter className="stock_button_class" filter={globalFilter} setFilter={setGlobalFilter}  />

      <div className="img-grid">

      { docs && docs.map(doc => (
        <div>        
        {filter(doc) && <div>
          <div className="img-wrap" key={doc.id}
            onClick={() => setSelectedDoc(doc)} >
            {(doc.fileType === 'image/jpeg' || doc.fileType === 'image/png') &&
              <img src={doc.fileUrl} alt={doc.fileName} />}
            {doc.fileType === 'application/pdf' &&
              <iframe src={doc.fileUrl} title={doc.fileName} />   }
          </div>
          <div> {doc.fileName}  </div>
        </div>}
        </div> 
      ))}
      </div>
      {selectedDoc && <Modal selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc}/> }

      <ImageTable docs={docs} setSelectedDoc={setSelectedDoc} getPictures = {getPictures} galery = {props.galery} admin = {admin} />
      <hr/>  
    </div>
  )
}

export default ImageGrid;
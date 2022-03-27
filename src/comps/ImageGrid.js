import React, { useState, useEffect } from "react";

import { db, app, projectStorage } from '../firebaseConfig'
// import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom'
// import {Document, Page, pdgjs} from 'react-pdf';
import UploadForm from './UploadForm'
import Modal from "./Modal";
// import '../index.css'
// import useFirestore from '../hooks/useFirestore'

const ImageGrid = ({ setAllDocs, admin }) => {
  const [docs, setDocs] = useState([]);

  const firebaseCollection = 'pictures';
  const picturesRef = collection(db, "pictures");
  const [selectedDoc, setSelectedDoc] = useState (null)
  const getPictures = async () => {
    try {
      let documents = [];
      const unsub =  await getDocs (picturesRef);

      for (let i = 0; i < unsub.docs.length; i++) {
        const doc = unsub.docs[i].data();
        const id = unsub.docs[i].id;
        documents.push({...doc, id: id})
      }
      console.log ('getPictuires ', documents.length)
      setDocs (documents);
      // setAllDocs (documents);
      console.log (documents);
      return unsub;
    } catch (e) {console.log (e)}

  }

  useEffect (() => {
    getPictures ();
  }, []);




  return (
    <div >
      <h3> images: {docs.length} </h3>
      {<UploadForm getPictures = {getPictures} admin = {admin}/> }
      <div className='w-100 text-center mt-2'>
        Need admin access? <Link to="/dashBoard" > Authorise/Login </Link>
      </div>
      <div className="img-grid">
      { docs && docs.map(doc => (
        <div className="img-wrap" key={doc.id}
          onClick={() => setSelectedDoc(doc)} >

          {doc.type === 'application/pdf' &&   <iframe src={doc.url} width="1000" height="1000" title={doc.name}/>   }

          {(doc.type === 'image/jpeg' || doc.type === 'image/png') && <img src={doc.url} alt={`name: ${doc.name}  size:  ${doc.size} type: ${doc.type}`} />}
          <div> name: {doc.name}  size:  {doc.size} 'type:' {doc.type}</div>
        </div>      
      ))}
      </div>
      {selectedDoc && <Modal selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc}/> }
    </div>
  )
}

export default ImageGrid;
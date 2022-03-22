import React, { useState, useEffect } from "react";

import { db, app, projectStorage } from '../firebaseConfig'
// import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";
// import {Document, Page, pdgjs} from 'react-pdf';

// import '../index.css'
// import useFirestore from '../hooks/useFirestore'

const ImageGrid = ({ setSelectedDoc }) => {
  const [docs, setDocs] = useState([]);


  const firebaseCollection = 'pictures';
  const picturesRef = collection(db, "pictures");

  const getPictures = async () => {
    try {
      let documents = [];
      const unsub =  await getDocs (picturesRef);

      for (let i = 0; i < unsub.docs.length; i++) {
        const doc = unsub.docs[i].data();
        const id = unsub.docs[i].id;
        documents.push({...doc, id: id})
      }
      setDocs (documents);
      console.log (documents);
      return unsub;
    } catch (e) {console.log (e)}
  }

  useEffect ((firebaseCollection) => {
    return getPictures ();
  }, [firebaseCollection]);




  return (
    <div className="img-grid">
      { docs && docs.map(doc => (
        <div className="img-wrap" key={doc.id}
          onClick={() => setSelectedDoc(doc)} >

          {doc.type === 'application/pdf' &&   <iframe src={doc.url} width="1000" height="1000" />   }

          {(doc.type === 'image/jpeg' || doc.type === 'image/png') && <img src={doc.url} alt={`name: ${doc.name}  size:  ${doc.size} type: ${doc.type}`} />}
          <div> name: {doc.name}  size:  {doc.size} 'type:' {doc.type}</div>
        </div>

      ))}

    </div>
  )
}

export default ImageGrid;
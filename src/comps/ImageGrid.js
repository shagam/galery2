import React, { useState, useEffect } from "react";

import { db, app, projectStorage } from '../firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";
import '../index.css'
// import useFirestore from '../hooks/useFirestore'

const ImageGrid = ({ setSelectedImg }) => {
  const [docs, setDocs] = useState([]);
  const firebaseCollection = 'pictures';
  
  // const { docs } = useFirestore('pictures');

  // console.log (docs);
  const picturesRef = collection(db, "pictures");

  const getPictures = async () => {
    try {

    // const ipReadList = await getDocs(picturesRef);
      let documents = [];
      const unsub =  await getDocs (picturesRef);


      for (let i = 0; i < unsub.docs.length; i++) {
        const doc = unsub.docs[i].data();
        const id = unsub.docs[i].id;
        documents.push({...doc, id: id})
      }
      setDocs (documents);
      console.log (documents);
      return documents;
    } catch (e) {console.log (e)}
  }

  useEffect ((firebaseCollection) => {
    return getPictures ();
  }, [firebaseCollection]);




  return (
    <div className="img-grid">
      { docs && docs.map(doc => (
        <div className="'img-wrap" key={doc.id}
          onClick={() => setSelectedImg(doc.url)} >
          <img src={doc.url} alt="uploaded pic" />
        </div>

      ))}

    </div>
  )
}

export default ImageGrid;
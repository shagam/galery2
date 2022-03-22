import React, { useState, useEffect } from "react";

import { db, app, projectStorage } from '../firebaseConfig'
// import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";
// import {Document, Page, pdgjs} from 'react-pdf';

// import '../index.css'
// import useFirestore from '../hooks/useFirestore'

const ImageGrid = ({ setSelectedImg }) => {
  const [docs, setDocs] = useState([]);
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  const firebaseCollection = 'pictures';

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // }
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
        <div className="img-wrap" key={doc.id}
          onClick={() => setSelectedImg(doc.url)} >
          {doc.type === 'application/pdf' && 
           <div>
              {/* <Document
                file={doc.url} onLoadSuccess={onDocumentLoadSuccess} >
                <Page pageNumber={pageNumber} />
              </Document> */}
              <iframe src={doc.url} width="1000" height="1000" />
            {/* <object data={doc.url} type="application/pdf" width="200%" height="100%"> */}
            </div>
          }

          {(doc.type === 'image/jpeg' || doc.type === 'image/png') && <img src={doc.url} alt={`name: ${doc.name}  size:  ${doc.size} type: ${doc.type}`} />}
          <div> name: {doc.name}  size:  {doc.size} 'type:' {doc.type}</div>
        </div>

      ))}

    </div>
  )
}

export default ImageGrid;
import {useState, useEffect} from "react";

import { db, app, projectStorage } from '../firebaseConfig'
// import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";

const picturesRef = collection(db, "pictures");

const useFirestore = async (collection) => {
  const [docs, setDocs] = useState ([]);

//   const getPictures = async () => {
//     try {
//       const picturesRef = collection (db, collection_)
//       const unsub =  await getDocs (picturesRef)   // .orderBy('createdAt', 'desc')
//       .onSnapshot((snap) => {
//         let documents = [];
//         snap.forEach(doc => {
//           documents.push({...doc.data(), id: doc.id})
//         });
//         setDocs (documents);
//       })
//       return (() => unsub());
//     } catch (e) {console.log (e)}
//   }

//   return getPictures();
// }

  const getPictures = async () => {


      let documents = [];
      const unsub =  await getDocs (picturesRef);
      for (let i = 0; i < unsub.docs.length; i++) {
        const doc = unsub.docs[i].data()
        documents.push({...doc, id: doc.id})
      }
      setDocs (documents);
      console.log (documents);
      return () => unsub();
  }

  useEffect (() => {
    const unsub = projectStorage.collection(collection)
    .orderBy('createdAt', 'desc')
    .onSnapShot((snap) =>{
      let documents = [];
      snap.forEach(doc => {
        documents.push({...doc.data(), id: doc.id})
      })
      setDocs (documents);
    });
    return () => unsub();
    // return getPictures ();
  }, [collection]);



  // useEffect ((collection_) => {
  //   return getPictures ();
  // }, [collection_]);

  return { docs } ;
}

export default useFirestore;
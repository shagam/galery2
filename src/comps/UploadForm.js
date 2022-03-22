import React, { useState } from 'react';
// import ProgressBar from './ProgressBar';
import { db, app, projectStorage } from '../firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";


const UploadForm = () => {
  const [files, setFiles] = useState([]);
  // const [filesUrl, setFilesUrl] = useState({});
  const [error, setError] = useState(null);
  const [progress, setProgress] = React.useState(0)
  const [fileUrl, setFileUrl] = React.useState(null);

  const types = ['image/png', 'image/jpeg', 'application/pdf'];

  const formHandler = (e) => {
    e.preventDefault();

    const selectedFiles = e.target[0].files;
    

    if (selectedFiles) {
      setFiles (selectedFiles);
      setError('');
      try {
        console.log (selectedFiles);
        uploadOneFile(selectedFiles);


      } catch (e) {console.log (e)}

    } else {
      setFiles(null);
      setError ('Please select an image file (png or jpeg or pdf)');
    }
  }

  const firebasePictureInfoAdd = async (file, url) => {

    console.log ( 'firebasePictureInfoAdd', file.name);
    try {
      // filesUrl [file.name] = url;

      const picturesRef = collection(db, "pictures");
  
      await addDoc (picturesRef, {name: file.name, url: url, size: file.size, type: file.type})
    } catch (e) {console.log (e)}               
  }

  // const uploadFiles

  const uploadOneFile = async (files) => {
    if (! files) return;

    try {
      const picturesRef = collection(db, "pictures");

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (! types.includes(file.type)) {
          console.log ('wrong file type: ', file);
          continue;
        }

        var userQuery = query (picturesRef, where('name', '==', file.name));
        const picture = await getDocs(userQuery);

        // check if already exist
        if (picture.docs.length > 0) {
          alert ('duplicate file:   ' + file.name);
          continue;
        }         

        const storageRef = ref(projectStorage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on(
          "state_changed",
          (snapshot) => {
          const prog = Math.round ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress (prog)
        }, (err) => console.log(err),
        () => { // upload complete
          getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {firebasePictureInfoAdd (file, url)
            && setFileUrl(url)
          });
        }
        );
      }
    } catch (e) {console.log (e)}
  }



  return (

    <form onSubmit={formHandler} >
      <input type="file" name= "file" id="file" className="input"  multiple  />
      <input type="text" name = "name" placeholder="NAME"></input>
      {/* <input type="text" name = "size" placeholder="SIZE"></input>
      <input type="text" name = "technology" placeholder="technology"></input> */}
      <button type="submit"> Upload </button> 
      <hr/>
      { progress !== 0 && progress !== 100 && <h3>uploaded {progress} %</h3>}

      {error && <div className='error'>{error}</div>}
      {files && <div> {files} </div>}
    </form>

  )

}

export default UploadForm
import React, { useState } from 'react';
// import ProgressBar from './ProgressBar';
import { db, app, projectStorage } from '../firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";


const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [filesUrl, setFilesUrl] = useState({});
  const [error, setError] = useState(null);
  const [progress, setProgress] = React.useState(0)
  const [fileUrl, setFileUrl] = React.useState(null);

  const types = ['image/png', 'image/jpeg', 'image/pdf', 'application/pdf'];

  const formHandler = (e) => {
    e.preventDefault();
    const selectedFile = e.target[0].files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
      try {
        console.log (selectedFile);
        uploadFiles(selectedFile);


      } catch (e) {console.log (e)}

    } else {
      setFile(null);
      setError ('Please select an image file (png or jpeg or pdf)');
    }
  }

  const firebasePictureInfoAdd = async (fileName, url, size) => {

    console.log ( 'firebasePictureInfoAdd', fileName);
    try {
      // filesUrl [file.name] = url;

      const picturesRef = collection(db, "pictures");
  
      await addDoc (picturesRef, {name: fileName, url: url, size: size})
    } catch (e) {console.log (e)}               
  }


  const uploadFiles = async (file) => {
    if (! file) return;

    try {

      const picturesRef = collection(db, "pictures");
      var userQuery = query (picturesRef, where('name', '==', file.name));
      const picture = await getDocs(userQuery);

      // check if already exist
      if (picture.docs.length > 0) {
        alert ('duplicate file: ' + "  " + file.name);
        return;
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
        .then(url => {firebasePictureInfoAdd (file.name, url, file.size)
          && setFileUrl(url)
        });
      }
      );
    } catch (e) {console.log (e)}
  }



  return (

    <form onSubmit={formHandler}>
      <input type="file" name= "file" className="input"    />
      <input type="text" name = "name" placeholder="NAME"></input>
      {/* <input type="text" name = "size" placeholder="SIZE"></input>
      <input type="text" name = "technology" placeholder="technology"></input> */}
      <button type="submit"> Upload </button> 
      <hr/>
      { progress !== 0 && progress !== 100 && <h3>uploaded {progress} %</h3>}

      {error && <div className='error'>{error}</div>}
      {file && <div> {file.name} </div>}
    </form>

  )

}

export default UploadForm
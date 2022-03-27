import React, { useState } from 'react';
// import ProgressBar from './ProgressBar';
import { db, app, projectStorage, auth } from '../firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";
import {onAuthStateChanged} from 'firebase/auth'
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// import cloneDeep from 'lodash/cloneDeep'

const picturesRef = collection(db, "pictures");

const UploadForm = (props) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = React.useState(0)
  const { currentUser } = useAuth();
  const [user, setUser] = useState();

  onAuthStateChanged (auth, (currentUser) => {
    setUser (currentUser);
    // console.log (currentUser);
  })

  if (! {user}) return null;

  const types = ['image/png', 'image/jpeg', 'application/pdf'];

  const formHandler = async (e) => {
    e.preventDefault();

    const selectedFiles = [];
    for (let i = 0; i < e.target[0].files.length; i++) {
      const file = e.target[0].files[i];
      if (! types.includes(file.type)) {
        console.log ('wrong file type: ', file);
        continue;
      }

      // avoid duplicate file name, check if already exist
      var userQuery = query (picturesRef, where('name', '==', file.name));
      const picture = await getDocs(userQuery);

      if (picture.docs.length > 0) {
        alert ('duplicate file:   ' + file.name);
        continue;
      }
      selectedFiles.push (file);
    }
    e.target.reset(); // clear form


    if (selectedFiles) {
      setFiles (selectedFiles);
      setError('');
      try {
        // console.log (selectedFiles);
        uploadOneFiles(selectedFiles);
      } catch (e) {console.log (e)}
    } else {
      setFiles(null);
      setError ('Please select an image file (png or jpeg or pdf)');
    }

  }

  const firebasePictureInfoAdd = async (file, url, last) => {
    console.log ( 'firebasePictureInfoAdd', file.name);
    try {
      await addDoc (picturesRef, {name: file.name, url: url, size: file.size, type: file.type, modified: file.
        lastModifiedDate})
      if (last)
        props.getPictures();  // refresh pictures on last to avoid duplicate 
    } catch (e) {console.log (e)}               
  }


  const uploadOneFiles = (files) => {
    if (! files) return;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
      
        const storageRef = ref(projectStorage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        const last = i === files.length - 1 ? true : false;
        uploadTask.on(
          "state_changed",
          (snapshot) => {
          const prog = Math.round ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress (prog)
        }, (err) => console.log(err),
        () => { // upload complete
          getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {firebasePictureInfoAdd (file, url, last)
          });
        }
        );
      }
    } catch (e) {console.log (e)}
  }



  return (
    <div>
      <form onSubmit={formHandler} >
        {user && <div>'Email: ' + {user.email} </div> }
        <input type="file" name= "file" id="file" className="input"  multiple  />
        <input type="text" name = "name" placeholder="NAME"></input>
        {/* <input type="text" name = "size" placeholder="SIZE"></input>
        <input type="text" name = "technology" placeholder="technology"></input> */}
        <button type="submit"> Upload </button> 
        <hr/>
        { progress !== 0 && progress !== 100 && <h3>uploaded {progress} %</h3>}

        {error && <div className='error'>{error}</div>}
        {/* {files && <div> {files} </div>} */}
      </form>
    </div>
    
  )

}

export default UploadForm
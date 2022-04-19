import React, { useState } from 'react';

import { db, app, projectStorage, auth } from '../firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";
import {onAuthStateChanged} from 'firebase/auth'
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// import cloneDeep from 'lodash/cloneDeep'



const UploadForm = (props) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = React.useState(0)
  const { currentUser, admin } = useAuth();
  const [user, setUser] = useState();
  // const [admin, setAdmin] = useState (true)
  
  const picturesRef = collection(db, props.galery);
  // check for admin
  onAuthStateChanged (auth, (currentUser) => {
    setUser (currentUser);
  // if (currentUser)
  //     setAdmin (true)
    // console.log (currentUser);
  })

  // if (! {user}) return null;

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
      var userQuery = query (picturesRef, where('fileName', '==', file.name));
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
        uploadFiles(selectedFiles);
      } catch (e) {setError(e.message) && console.log (e)}
    } else {
      setFiles(null);
      setError ('Please select an new image file (png or jpeg or pdf)');
    }

  }



  const uploadFiles = async (files) => {
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
          .then(url => {
            // firebasePictureInfoAdd (file, url, last) 
            console.log ( 'firebasePictureInfoAdd', file.name);
            const kb = Math.round(file.size / 1024);
            // async
             addDoc (picturesRef, {fileName: file.name, fileUrl: url, file_kb: kb, fileType: file.type,
              fileScanned: file.lastModifiedDate})
            if (last)
              props.getPictures();  // refresh pictures on last to avoid duplicate            
          });
        }
        );
      }
    } catch (e) { console.log (e)}
  }



  return (
    //  admin &&
      <div>
      <form onSubmit={formHandler} >
        <input type="file" name= "file" id="file" className="input"  multiple  />
        {/* <input type="text" name = "name" placeholder="NAME"></input> */}
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
import React, { useState } from 'react';
// import ProgressBar from './ProgressBar';
import { app, projectStorage } from '../config'
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"


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

  const uploadFiles = (file) => {
    if (! file) return;

    try {
    const storageRef = ref(projectStorage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      "state_changed",
       (snapshot) => {
      const prog = Math.round ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress (prog)
    }, (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url => {setFileUrl(url) && console.log(url) &&
        app.collection("pictures").doc(file).set ({
          name: file.name,
          url: url
        });      
      filesUrl [file.name] = url;
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
      <h3>uploaded {progress} %</h3>

      {error && <div className='error'>{error}</div>}
      {file && <div> {file.name} </div>}
    </form>

  )

}

export default UploadForm
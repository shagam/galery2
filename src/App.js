import React, { useEffect } from 'react';
import { app, storage } from './config.js'
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"

import './App.css';


// const db = app.firestore();


function App() {
  const [progress, setProgress] = React.useState(0)
  const [fileUrl, setFileUrl] = React.useState(null);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    console.log (file);
    uploadFiles(file);
    // db.collection("users").doc(file).set ({
    //   name: file,
    //   avatar: fileUrl
    // });
  }

  const uploadFiles = (file) => {
    if (! file) return;
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      "state_changed",
       (snapshot) => {
      const prog = Math.round ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress (prog)
    }, (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url => {setFileUrl(url) && console.log(url)});
    }
    );
  }


  return (
    <div>
      <form onSubmit={formHandler}>
        <input type="file" name= "file" className="input"    />
        <input type="text" name = "name" placeholder="NAME"></input>
        <button type="submit"> Upload </button> 
      </form>

      <hr/>
      <h3>uploaded {progress} %</h3>

      <ul>
        {/* {users.map(user => {
          return <li key={user.name}>
             <img with="100" hight="100" src ={user.avatar} alt={user.name} />
          <p>user.name</p></li>
        })} */}
      </ul>
    </div>
  );
}

export default App;

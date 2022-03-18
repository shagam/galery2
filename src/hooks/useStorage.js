import { useState, useEffect } from "react";
import { projectStorage } from "../config";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"

const useStorage = (file) => {
  const [progress, setProgress] = useState (0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);


  useEffect(() => {
    // refrences
    try {
    // const storageRef = projectStorage.re(file.name);
    const storageRef = ref(projectStorage, `/files/${file.name}`)

    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransfered / snap.totalBytes) * 100;
      setProgress(progress);
    }, (err) => {
      setError(err);
    }, async () => {
      // finish load
      const url = await storageRef.getDownloadURL ();
      setUrl (url);
    });
  } catch (e) {console.log (e)}
  }, [file])


  return { progress, url, error };

}

export default useStorage;
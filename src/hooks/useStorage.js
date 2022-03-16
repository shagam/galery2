import { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState (0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);


  useEffect(() => {
    // refrences
    const storageRef = projectStorage.ref(file.name);
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
  }, [file])

  return { progress, url, error };

}

export default useStorage;
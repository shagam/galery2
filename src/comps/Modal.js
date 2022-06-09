import React, {useState} from "react";
import EditDoc from './EditDoc'
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebaseConfig'
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore"
import { getStorage, ref, deleteObject, getMetadata } from "firebase/storage"


const Modal = ({ selectedDoc, setSelectedDoc, getPictures, gallery }) => {
  const [editDoc, setEditDoc] = useState();
  const [error, setError] = useState();
  const { admin } = useAuth();

  const focusClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedDoc (null);
    }
  } 
  
  async function deleteClick(delDoc) {
    // const fileDoc = findDocFromImageName(fileName)
    const id = delDoc.id;

    try{ 
      // delete doc
      var imageDoc = doc(db, gallery, id);
      await deleteDoc (imageDoc);

      // Delete the image
      const storage = getStorage();
      const fullFileName = 'files/' + gallery + '_' + delDoc.fileName
      const imageRef = ref (storage, fullFileName);
      await deleteObject(imageRef);
      console.log ('delete success ', delDoc)
        // File deleted successfully 
        setSelectedDoc (null)  
      getPictures();
      setError();
    } catch(e) {setError(e.message) && console.log(e)
    }
  }



  return (

    <div className="backdrop" onClick={focusClick}>
      {error && <div className='error'>{error}</div>}
      { !editDoc && <div>
      
        <img src={selectedDoc.fileUrl} alt="enlarged pic" />
     
        <div style={{display:'flex', fontSize:'2.0vw'}}>

          <button type="button" onClick={()=>setSelectedDoc (null)}>close</button>
          {admin && <button type="button"  onClick={()=>setEditDoc (selectedDoc)}>edit</button>}
          {admin && <button type="button"  onClick={()=>deleteClick(selectedDoc)}>del</button>}

          <div  style= {{color:'magenta' }} >  &nbsp; <strong>  {selectedDoc.fileName}</strong>  &nbsp;   </div>
          <div> {selectedDoc.category} &nbsp; {selectedDoc.technique}  &nbsp; {selectedDoc.size}  &nbsp; &nbsp; {selectedDoc.year}</div>
             
        </div>
        {/* <hr/>         <hr/>      <hr/> */}
        </div>}
        <hr/>   <hr/>   <hr/>   <hr/>   
        
        {editDoc && <EditDoc editDoc={selectedDoc} getPictures = {getPictures} setEditDoc={setEditDoc} gallery = {gallery} setSelectedDoc={setSelectedDoc}/>}



        {/* <textarea rows="5" cols="100" name = "description"  readOnly
            //  defaultValue={selectedDoc.description}
            placeholder={selectedDoc.description} 
            >
        </textarea>  */}

    </div>
  )
}

export default Modal;
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
     
        <div style={{display:'flex'}}>

          <button type="button" style= {{'fontSize':'1.5vw' }} onClick={()=>setSelectedDoc (null)}>close</button>
          {admin && <button type="button" style= {{'fontSize':'1.5vw' }} onClick={()=>setEditDoc (selectedDoc)}>edit</button>}
          {admin && <button type="button" style= {{'fontSize':'1.5vw' }} onClick={()=>deleteClick(selectedDoc)}>del</button>}

          <h4 className='text-center mb-1' style= {{color:'magenta','fontSize':'1.8vw' }} >  &nbsp; <strong>  {selectedDoc.fileName}</strong>  &nbsp;   </h4>
          <h4  style= {{'fontSize':'1.8vw' }}> {selectedDoc.category} &nbsp; {selectedDoc.technique}  &nbsp; {selectedDoc.size}  &nbsp; &nbsp; {selectedDoc.year}</h4>
             
        </div>
        {/* <hr/>         <hr/>      <hr/> */}
        </div>}
        <hr/>   <hr/>   <hr/>   <hr/>   
        
        {editDoc && <EditDoc editDoc={selectedDoc} getPictures = {getPictures} setEditDoc={setEditDoc} gallery = {gallery}/>}



        {/* <textarea rows="5" cols="100" name = "description"  readOnly
            //  defaultValue={selectedDoc.description}
            placeholder={selectedDoc.description} 
            >
        </textarea>  */}

    </div>
  )
}

export default Modal;
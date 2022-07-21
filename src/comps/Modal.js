import React, {useState} from "react";
import EditDoc from './EditDoc'
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebaseConfig'
import {  doc, deleteDoc} from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage"
import MobileContext from './MobileContext';

const Modal = ({ selectedDoc, setSelectedDoc, getPictures, gallery, setEditDocGallery }) => {
  const [editDoc, setEditDoc] = useState();
  const [error, setError] = useState();
  const { admin } = useAuth();

  const focusClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedDoc (null);
    }
  } 
  
  const { userAgentMobile } = MobileContext();

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

  const fontSizeStyle = userAgentMobile ? '1.2em' : '1.7em'

  return (

    <div className="backdrop" onClick={focusClick}>
      {error && <div className='error'>{error}</div>}
      { !editDoc && <div>
      
        <img src={selectedDoc.fileUrl} alt="enlarged pic" />
     
        <div style={{display:'flex', fontSize:`${fontSizeStyle}`}}>
        {/* <div style={{display:'flex', fontSize:'1.3em'  }}> */}

          <button type="button" onClick={()=>setSelectedDoc (null)}>close</button>
          {admin && <button type="button"  onClick={()=>setEditDocGallery (selectedDoc)}>edit</button>}
          {admin && <button type="button"  onClick={()=>deleteClick(selectedDoc)}>del</button>}

          <div  style= {{color:'magenta' }} >  &nbsp; <strong>  {selectedDoc.fileName}</strong>  &nbsp;   </div>
          <div  style={{display:'flex'}}> {selectedDoc.category} &nbsp; {selectedDoc.technique}  &nbsp; {selectedDoc.size}  &nbsp; &nbsp; {selectedDoc.year}</div>
          <hr/>   
        </div>
        {/* <hr/>         <hr/>      <hr/> */}
        </div>}
        
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
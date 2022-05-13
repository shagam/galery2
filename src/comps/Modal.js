import React, {useState} from "react";
import EditDoc from '../table/EditDoc'
import { useAuth } from '../contexts/AuthContext';

const Modal = ({ selectedDoc, setSelectedDoc, getPictures, gallery }) => {
  const [editDoc, setEditDoc] = useState();

  const { admin } = useAuth();

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedDoc (null);
    }
  } 
  
  return (

    <div className="backdrop" onClick={handleClick}>

      {!editDoc && <img src={selectedDoc.fileUrl} alt="enlarged pic" />}

      <div style={{display:'flex'}}>
        <button type="button" style= {{'fontSize':'1.8vw' }} onClick={()=>setSelectedDoc (null)}>close</button>
        {admin && <button type="button" style= {{'fontSize':'1.8vw' }} onClick={()=>setEditDoc (selectedDoc)}>edit</button>}
        <h4 className='text-center mb-1' style= {{color:'magenta','fontSize':'1.8vw' }} >  &nbsp; <strong>  {selectedDoc.fileName}</strong>  &nbsp;   </h4>
        <h4  style= {{'fontSize':'1.8vw' }}> {selectedDoc.category} &nbsp; {selectedDoc.technique}  &nbsp; {selectedDoc.size}  &nbsp; &nbsp; {selectedDoc.year}</h4>
      </div>
      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>      <hr/>

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
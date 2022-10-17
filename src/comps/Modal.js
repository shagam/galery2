import React, {useState} from "react";

import { Link } from 'react-router-dom'

import EditDoc from './EditDoc'
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebaseConfig'
import {  doc, deleteDoc} from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage"
import MobileContext from './MobileContext';
// import Editor from "./Editor";

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import EditorReadOnly from "./EditorReadOnly";
import EditorDraft from "./EditorDraft";
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { FaCat } from "react-icons/fa";


const Modal = ({ selectedDoc, setSelectedDoc, getPictures, gallery }) => {

  // <Route path={'/modal'} element={<Modal selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc}
  // getPictures = {getPictures} gallery = {admins[adminId].gallery} editDoc = {editDoc} setEditDoc={setEditDoc} />} />


  // const [editDoc, setEditDoc] = useState();
  const [error, setError] = useState();
  const { admin } = useAuth();
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
  const contentBlock = htmlToDraft(html);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState_ = EditorState.createWithContent(contentState);
    // setEditorState (editorState_)
  }
  const focusClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      // setSelectedDoc (null);
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
        // setSelectedDoc (null)  
      getPictures();
      setError();
    } catch(e) {setError(e.message) && console.log(e)
    }
  }

  const fontSizeStyle = userAgentMobile ? '1.2em' : '1.7em'
  const horizontal = userAgentMobile ? 'flex' : 'flex'
  const cat = '/' + selectedDoc.category;
  console.log (cat)

  return (

    <div className="backdrop" onClick={focusClick}>
      {error && <div className='error'>{error}</div>}
      <div  style={{display:'flex', fontSize:`${fontSizeStyle}`, marginTop: '10vh'}}>
      
        <div>
          <img style={{zoom:'80%'}} src={selectedDoc.fileUrl} alt="enlarged pic" />
        </div>

        <div style={{}}>
  
          {selectedDoc.richDoc&& <div style={{ 'width': '30vw', 'height': '40vh', 'marginLeft': '20px', border: '2px solid blue'}}>
             <EditorDraft  richDoc={selectedDoc.richDoc} readOnly={true} />  
          </div>}

        {/* <div style={{display:'flex', fontSize:'1.3em'  }}> */}
          <hr/> 
          <div  style= {{color:'red' }} > <strong>  {selectedDoc.fileName}</strong>  &nbsp;   </div>
          <div  style= {{color:'magenta' }} >  {selectedDoc.title} &nbsp;  &nbsp;   </div>
          <div  style={{display:'flex'}}> ({selectedDoc.fileName}, {selectedDoc.category},{selectedDoc.technique}, {selectedDoc.size}, {selectedDoc.year})</div>

          <hr/>
          
          <div>
            <Link to={cat} onClick={() => {}}  >close</Link>
            &nbsp;&nbsp;

            <Link to={'/editDoc'}  onClick={() => {}} >Edit</Link>

            &nbsp;&nbsp;
            <Link to={cat}  onClick={() => {deleteClick(selectedDoc)}} >del  </Link>

          </div>
      
          <hr/>

        </div>
        {/* <hr/>         <hr/>      <hr/> */}
        </div>
   
        {/* <Editor/> */}

    </div>
  )
}

export default Modal;
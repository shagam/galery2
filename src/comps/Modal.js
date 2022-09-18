import React, {useState} from "react";
import EditDoc from './EditDoc'
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebaseConfig'
import {  doc, deleteDoc} from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage"
import MobileContext from './MobileContext';
// import Editor from "./Editor";

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import EditorReadOnly from "./EditorReadOnly";
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'


const Modal = ({ selectedDoc, setSelectedDoc, getPictures, gallery, setEditDocGallery }) => {
  const [editDoc, setEditDoc] = useState();
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
      <div  style={{display:'flex'}}>
      
        <div>
          <img style={{zoom:'80%'}} src={selectedDoc.fileUrl} alt="enlarged pic" />
        </div>

        <div style={{ fontSize:`${fontSizeStyle}`, marginTop: '10vh'}}>
        {/* <div style={{display:'flex', fontSize:'1.3em'  }}> */}
          <hr/> 
          <div  style= {{color:'magenta' }} >  {selectedDoc.title} &nbsp;  &nbsp;   </div>
          <div  style= {{color:'magenta' }} > <strong>  {selectedDoc.fileName}</strong>  &nbsp;   </div>
          <div  style={{display:'flex'}}> ({selectedDoc.category}, {selectedDoc.technique}, {selectedDoc.size}, {selectedDoc.year})</div>

          <hr/>
          
          <div>
            <button type="button" onClick={()=>setSelectedDoc (null)}>close</button>
            {admin && <button type="button"  onClick={()=>setEditDocGallery (selectedDoc)}>edit</button>}
            {admin && <button type="button"  onClick={()=>deleteClick(selectedDoc)}>del</button>}
          </div>
      
          <hr/>

          {/* <div style={{ 'width': '30vw', 'height': '40vh', 'marginLeft': '20px', border: '2px solid blue'}}>
             <EditorReadOnly editorState={EditorState.createEmpty()} />  
          </div> */}


          {/* <hr/>
          <textarea rows="12" cols="35" name = "description" 
           defaultValue={selectedDoc.description}  placeholder={selectedDoc.description}
          >

          </textarea> */}

          <hr/>

    
        </div>
        {/* <hr/>         <hr/>      <hr/> */}
        </div>
        
        {editDoc && <EditDoc editDoc={selectedDoc} getPictures = {getPictures} setEditDoc={setEditDoc} gallery = {gallery} setSelectedDoc={setSelectedDoc}/>}

        {/* <Editor/> */}

        {/* <textarea rows="5" cols="100" name = "description"  readOnly
            //  defaultValue={selectedDoc.description}
            placeholder={selectedDoc.description} 
            >
        </textarea>  */}

    </div>
  )
}

export default Modal;
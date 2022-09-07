import React, { } from 'react'
// Component  Function
import { EditorState, } from 'draft-js';
import { convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

function EditorReadOnly (props) {

  // const [editorState, setEditorState] = useState (EditorState.createEmpty())
  // const [editorState, setEditorState] = useState (props.draftState) 
   //({props.draftState})
  // (EditorState.createWithContent(htmlToDraft('<p>abcd</p>')))  
  // htmlToDraft('<p>abcd</p>')
  // console.log (editorState.getCurrentContent())

  // function onEditorStateChange (editorState_) {
  //   console.log (draftToHtml (convertToRaw (editorState_.getCurrentContent())))
  //   // console.log (draftToHtml)
  //   setEditorState (editorState_)
  //   // props.setEditorState(editorState)
  // };

  return (
    // {console.log (convertToRaw (editorState.getCurrentContent()))}
    <div>
      <div>
        <Editor
          toolbarHidden
          readOnly
          editorState={props.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          // onEditorStateChange={onEditorStateChange}
        />

      </div>
      <hr/>
    </div> 
  )
}


export default EditorReadOnly
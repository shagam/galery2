// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp

import React, { } from 'react'
// Component  Function
import { EditorState, } from 'draft-js';
import { convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
// import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
// const in = EditorState.createEmpty();

function DraftEditor () {

  const [editorState, setEditorState] = useState (EditorState.createEmpty())
  // console.log (editorState.getCurrentContent())

  function onEditorStateChange (editorState_) {
    console.log (convertToRaw (editorState_.getCurrentContent()))
    setEditorState (editorState_)
  };

  return (
    // {console.log (convertToRaw (editorState.getCurrentContent()))}
    <div>
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />

      </div>
      <div> 
        {/* {editorState.getCurrentContent()} */}
      </div>
    </div> 
  )
}


export default DraftEditor
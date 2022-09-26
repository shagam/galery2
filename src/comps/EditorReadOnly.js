import React, { } from 'react'
// Component  Function
import { EditorState, ContentState} from 'draft-js';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import htmlToDraft from 'html-to-draftjs'


function EditorReadOnly (props) {

  const LOG = true;

  var html = props.richDoc;
  if (html === undefined || html === '')
    html = '<p></p>\n';
  const blocksFromHtml = htmlToDraft(html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const editorState_ = EditorState.createWithContent(contentState);
  if (LOG)
    console.log ('EditorState:', html)
    
  const [editorState, setEditorState] = useState (EditorState.createWithContent(editorState_.getCurrentContent()));


  return (

    <div>
      <div>
        <Editor
          toolbarHidden
          readOnly
          editorState={editorState}
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
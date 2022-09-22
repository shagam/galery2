// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
// https://draftjs.org/docs/api-reference-data-conversion/
// https://draftjs.org/docs/api-reference-content-state
// https://www.folkstalk.com/2022/09/how-to-convert-draftjs-content-to-html-with-code-examples.html
//https://stackoverflow.com/questions/68519755/how-to-set-initial-editor-state-in-react-draft-wysiwyg




import React, { } from 'react'
// Component  Function
import { convertToRaw, convertFromRaw, EditorState, convertFromHTML} from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'


import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';


function DraftEditor (props) {

  const sampleMarkup =
  '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
  '<a href="http://www.facebook.com">Example link</a>';

  // const [editorState, setEditorState] = useState({
  //   editorState: EditorState.createWithContent(
  //     convertFromRaw(sampleMarkup),
  //   ),
  // });

const [editorState, setEditorState] = useState (EditorState.createEmpty())

// EditorState.createWithContent(htmlToDraft('<p>abcd</p>'))

try {  

  // const stat = EditorState.getCurrentContent()

  const contentState = draftToHtml (editorState)
  // const cotentState = convertToRaw (editorState)

  const blocksFromHTML = convertFromHTML(sampleMarkup);

} catch (e) {console.log (e)}
  // const createFromBlockArray(
  //   blocks: Array<ContentBlock>,
  //   entityMap: ?OrderedMap
  // ): 
  // const state = ContentState.createFromBlockArray(
  //   blocksFromHTML.contentBlocks,
  //   blocksFromHTML.entityMap,
  // );


  // htmlToDraft('<p>abcd</p>')
  // console.log (editorState.getCurrentContent())

  function onEditorStateChange (editorState_) {
    
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    setEditorState (editorState_);
    
    console.log (draftToHtml (convertToRaw (editorState_.getCurrentContent())))

    // console.log (draftToHtml)
    setEditorState (editorState_)
    // props.setEditorState(editorState)
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
      <hr/>
      <div> 
        <textarea rows="5" cols="50" disabled value={draftToHtml (convertToRaw (editorState.getCurrentContent()))}></textarea>
      </div>

      {/* <div>
        {draftToHtml (convertToRaw (editorState.getCurrentContent()))}
      </div> */}
    </div> 
  )
}


export default DraftEditor
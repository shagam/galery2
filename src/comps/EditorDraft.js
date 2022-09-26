// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
// https://draftjs.org/docs/api-reference-data-conversion/
// https://draftjs.org/docs/api-reference-content-state
// https://www.folkstalk.com/2022/09/how-to-convert-draftjs-content-to-html-with-code-examples.html
//https://stackoverflow.com/questions/68519755/how-to-set-initial-editor-state-in-react-draft-wysiwyg




import React, {useState  } from 'react'
// Component  Function
import { convertToRaw, convertFromRaw, EditorState, convertFromHTML, ContentState, htmlToDraftBlocks} from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'


import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { initializeAuth } from 'firebase/auth';


function DraftEditor (props) {

  const LOG = true;


  // const content = EditorState.createWithContent("Hellow")

  var html = props.richDoc;
  if (html === undefined || html === "") {
    html = '<p></p>';  // empty html
    // const emptyState = EditorState.createEmpty();
    // const raw = convertToRaw (emptyState.getCurrentContent())
    // const html =  draftToHtml (raw)
  }
    // build editorState from html
    console.log (html)
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState_ = EditorState.createWithContent(contentState);
    // if (LOG)
    //   console.log ('EditorState:', html)
    
  const [editorState, setEditorState] = useState (EditorState.createWithContent(editorState_.getCurrentContent()));

  // console.log (editorState.getCurrentContent())

  function onEditorStateChange (editorState_) {

    const raw = convertToRaw (editorState_.getCurrentContent())
    const html =  draftToHtml (raw)

    setEditorState (editorState_)
    props.setRichDoc(html)

    if (LOG && false)
      console.log ('EditorState:', draftToHtml (convertToRaw (editorState_.getCurrentContent())))
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
        {editorState && <textarea rows="5" cols="50" disabled value={draftToHtml (convertToRaw (editorState.getCurrentContent()))}></textarea>}
        {/* {console.log (draftToHtml (convertToRaw (editorState.getCurrentContent())))*/}
      </div>

      {/* <div>
        {draftToHtml (convertToRaw (editorState.getCurrentContent()))}
      </div> */}
    </div> 
  )
}


export default DraftEditor
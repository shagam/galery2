// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
// https://draftjs.org/docs/api-reference-data-conversion/
// https://draftjs.org/docs/api-reference-content-state
// https://www.folkstalk.com/2022/09/how-to-convert-draftjs-content-to-html-with-code-examples.html
//https://stackoverflow.com/questions/68519755/how-to-set-initial-editor-state-in-react-draft-wysiwyg




import React, {useState  } from 'react'
// Component  Function
import { convertToRaw, convertFromRaw, EditorState, convertFromHTML} from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'


import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { initializeAuth } from 'firebase/auth';


function DraftEditor (props) {

  const LOG = true;
  // const [editorState, setEditorState] = useState({
  //   editorState: EditorState.createWithContent(
  //     convertFromRaw(sampleMarkup),
  //   ),
  // });

  const emptyState = EditorState.createEmpty();
  // const content = EditorState.createWithContent("Hellow")

  const init = props.richDoc !== '' || props.richDoc === undefined? props.richDoc : EditorState.createEmpty();
  var init1;
  if (LOG && init) { 
    const initContents = (init.getCurrentContent());
    // console.log (initContents)
    const raw = convertToRaw (init.getCurrentContent());
    const contents = convertFromRaw (raw)
    const init1 = EditorState.createWithContent(contents)
    console.log ('EditorState:', draftToHtml (convertToRaw (init1.getCurrentContent())))
  }
  const [editorState, setEditorState] = useState (init1);

  // EditorState.createWithContent(htmlToDraft('<p>abcd</p>'))

  try {  

    // const contentState = draftToHtml (editorState)
    // const cotentState = convertToRaw (editorState)
    const sampleMarkup =
    '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
    '<a href="http://www.facebook.com">Example link</a>';
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


  const draft1 = htmlToDraft('<p>abcd</p>')
  // console.log (editorState.getCurrentContent())

  function onEditorStateChange (editorState_) {
    // if (editorState_) {
    //   const rawContentState = convertToRaw(editorState_);
    //   const contentState = editorState.getCurrentContent();
    //   console.log('content state', convertToRaw(contentState));
      
    //   const html = draftToHtml (convertToRaw (editorState_.getCurrentContent()));
    //   console.log (html)
    //   const draft = htmlToDraft(html)
    //   console.log (draft)
    // }

    setEditorState (editorState_)
    props.setRichDoc(editorState_)



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
        {editorState && <textarea rows="5" cols="50" disabled value={draftToHtml (convertToRaw (editorState.getCurrentContent()))}></textarea>}
        {/* {console.log (draftToHtml (convertToRaw (editorState.getCurrentContent())))} */}
      </div>

      {/* <div>
        {draftToHtml (convertToRaw (editorState.getCurrentContent()))}
      </div> */}
    </div> 
  )
}


export default DraftEditor
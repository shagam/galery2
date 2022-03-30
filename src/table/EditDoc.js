import React, {useState} from 'react'
import { db, app, projectStorage, auth } from '../firebaseConfig'
import { collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore"
import { getStorage, ref, deleteObject, getMetadata } from "firebase/storage"


const  EditDoc = (props) => {

  const [category, setCategory] = useState ()
  const [size, setSize] = useState();
  const [canvas, setCanvas] = useState(null);
  const [paint, setPaint] = useState(null);
  const [year, setYear] = useState(null);
  const [description, setDescription] = useState();

  // const [newDoc, setNewDoc] = useState({});
  // console.log (props.editDoc)


  const formHandler = async (e) => {
    e.preventDefault();

      try {
        var category_ = category
        if (category_ === undefined && props.editDoc.category !== '') {
          category_ = props.editDoc.category
        }
        if (category_ === undefined) {
          setCategory('empty')
          category_="?"
        }

        var size_ = size;
        if (size_ === undefined && props.editDoc.size !== '') {
          size_ = props.editDoc.size
        }
        if (size_ === undefined){
          setSize('empty')
          size_="?"
        }

        var canvas_ = canvas;
        if (canvas_ === null && props.editDoc.canvas !== '') {
          canvas_ = props.editDoc.canvas
        }
        if (canvas_ === null){
           setCanvas('empty')
           canvas_ = "?"
        }

        var paint_ = paint
        if (paint_ === null && props.editDoc.paint !== '') {
          paint_ = props.editDoc.paint
        }
        if (paint_ === null){
          setPaint('empty')
          paint_ = "?";
        }

        var year_ = year
        if (year_ === null && props.editDoc.year !== '')
          year_ = props.editDoc.year
        if (year_ === null) {
          setYear('empty')
          year_="?"
        }

        var description_ = description;

        if (description_ === undefined && props.editDoc.description !== '')
          description_ = props.editDoc.description
        if (description_ === undefined) {
          setDescription('empty')
          description_ = "?"
        }


        // send doc to firebase
        const picturesRef = collection(db, "pictures");
        await addDoc (picturesRef, {fileName: props.editDoc.fileName, fileUrl: props.editDoc.fileUrl, file_kb: props.editDoc.file_kb, fileType: props.editDoc.fileType, fileScanned: props.editDoc.fileScanned, category: category_, size: size_, canvas: canvas_, paint: paint_, year: year_, description: description_})  // 

        // delete doc
        var imageDoc = doc(db, "pictures", props.editDoc.id);
        await deleteDoc (imageDoc);

        props.getPictures(); 
        props.setEditDoc(undefined);
      } catch (e) {console.log (e)}
  }


return (

  <div>
    {/* <div>Edit</div> */}
    <form onSubmit={formHandler} >
     <div>
     <div>
        Category
        <input type="text" name = "category" onChange={(e) => {setCategory(e.target.value)}}
        defaultValue={props.editDoc.category} placeholder={props.editDoc.category}/>

        Size
        <input type="text" name = "size" onChange={(e) => {setSize(e.target.value)}}
        defaultValue={props.editDoc.size} placeholder={props.editDoc.size}></input>
        </div>
        Canvas
        <input type="text" name = "canvas" onChange={(e) => {setCanvas(e.target.value)}}
        defaultValue={props.editDoc.canvas} placeholder={props.editDoc.canvas}></input>

        Paint
        <input type="text" name = "paint" onChange={(e) => {setPaint(e.target.value)}}
        defaultValue={props.editDoc.paint}  placeholder={props.editDoc.paint}></input>
        

        Year
        <input type="text" name = "year" onChange={(e) => {setYear(e.target.value)}}
         defaultValue={props.editDoc.year} placeholder={props.editDoc.year}></input>

        <div>
          Description
          {/* <div>
            <input type="textarea" name = "description" onChange={(e) => {setDescription(e.target.value)}}
            defaultValue={props.editDoc.description} placeholder={props.editDoc.description}></input>
          </div> */}
          <div>
          <textarea rows="5" cols="90" name = "description" 
           defaultValue={props.editDoc.description}  placeholder={props.editDoc.year}
           onChange={(e) => {setDescription(e.target.value)}}>

          </textarea>
          </div>
        </div>
     </div>
     <button type="submit"> submit </button> 
     <hr/>


     {/* {error && <div className='error'>{error}</div>} */}
     {/* {files && <div> {files} </div>} */}
   </form>
  </div>
   
  )
}

export default EditDoc;
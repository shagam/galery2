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
  // const [newDoc, setNewDoc] = useState({});
  console.log (props.editDoc)



  const formHandler = async (e) => {
    e.preventDefault();

  
      // copy from old doc

      // console.log (editDoc)
      // console.log (JSON.stringify(editDoc))
      try {
        // newDoc.id = props.editDoc.id;
        // newDoc.fileName = props.editDoc.fileName;
        // newDoc.fileType = props.editDoc.fileType;
        // newDoc.file_kb = props.editDoc.file_kb;
        // newDoc.fileUrl = props.editDoc.fileUrl;
        // newDoc.lastModifiedDate = props.editDoc.lastModifiedDate;

        // // insert new fields
        // newDoc.category = category;
        // newDoc.size = size; 
        // newDoc.canvas = canvas;
        // newDoc.paint = paint;
        // console.log(newDoc);


        // send doc to firebase
        const picturesRef = collection(db, "pictures");
        await addDoc (picturesRef, {fileName: props.editDoc.fileName, fileUrl: props.editDoc.fileUrl, file_kb: props.editDoc.file_kb, fileType: props.editDoc.fileType, fileScanned: props.editDoc.fileScanned, category: category, size: size, canvas: canvas, paint: paint, year: year})  // 

        // delete doc
        var imageDoc = doc(db, "pictures", props.editDoc.id);
        await deleteDoc (imageDoc);

        props.getPictures(); 
        props.setEditDoc(undefined);
      } catch (e) {console.log (e)}

      // newDoc["paint"] = year;
  }


return (

  <div>
    <div>Edit</div>
    <form onSubmit={formHandler} >
     <label>
        Category
        <input type="text" name = "category" onChange={(e) => {setCategory(e.target.value)}} placeholder={props.editDoc.category}/>
        Size
        <input type="text" name = "size" onChange={(e) => {setSize(e.target.value)}} placeholder={props.editDoc.size}></input>
        Canvas
        <input type="text" name = "canvas" onChange={(e) => {setCanvas(e.target.value)}} placeholder={props.editDoc.canvas}></input>
        Paint
        <input type="text" name = "paint" onChange={(e) => {setPaint(e.target.value)}} placeholder={props.editDoc.paint}></input>
        year
        <input type="text" name = "year" onChange={(e) => {setYear(e.target.value)}} placeholder={props.editDoc.year}></input>
     </label>
     <button type="submit"> submit </button> 
     <hr/>


     {/* {error && <div className='error'>{error}</div>} */}
     {/* {files && <div> {files} </div>} */}
   </form>
  </div>
   
  )
}

export default EditDoc;
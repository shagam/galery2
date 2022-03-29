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
  console.log (props.editDoc)


  const formHandler = async (e) => {
    e.preventDefault();

      try {
        if (category === undefined && props.editDoc.category !== undefined)
          setCategory(props.editDoc.category)
        else
          setCategory('')

        if (size === undefined && props.editDoc.size !== undefined)
          setSize (props.editDoc.size)
        else
          setSize ('')

        if (canvas === undefined && props.editDoc.canvas !== undefined)
          setCanvas(props.editDoc.canvas)
        else
          setCanvas('')

        if (paint === undefined)
          setCanvas(props.editDoc.paint)


        if (year === undefined)
          setYear(props.editDoc.year)

        if (description === undefined && props.editDoc.description !== undefined)
          setDescription(props.editDoc.description)
        else
          setDescription('')


        // send doc to firebase
        const picturesRef = collection(db, "pictures");
        await addDoc (picturesRef, {fileName: props.editDoc.fileName, fileUrl: props.editDoc.fileUrl, file_kb: props.editDoc.file_kb, fileType: props.editDoc.fileType, fileScanned: props.editDoc.fileScanned, category: category, size: size, canvas: canvas, paint: paint, year: year, description: description})  // 

        // delete doc
        var imageDoc = doc(db, "pictures", props.editDoc.id);
        await deleteDoc (imageDoc);

        props.getPictures(); 
        props.setEditDoc(undefined);
      } catch (e) {console.log (e)}
  }


return (

  <div>
    <div>Edit</div>
    <form onSubmit={formHandler} >
     <label>
        Category
        <input type="text" name = "category" onChange={(e) => {setCategory(e.target.value)}}
        defaultValue={props.editDoc.category} placeholder={props.editDoc.category}/>

        Size
        <input type="text" name = "size" onChange={(e) => {setSize(e.target.value)}}
        defaultValue={props.editDoc.size} placeholder={props.editDoc.size}></input>

        Canvas
        <input type="text" name = "canvas" onChange={(e) => {setCanvas(e.target.value)}}
        defaultValue={props.editDoc.canvas} placeholder={props.editDoc.canvas}></input>

        Paint
        <input type="text" name = "paint" onChange={(e) => {setPaint(e.target.value)}}
        defaultValue={props.editDoc.paint}  placeholder={props.editDoc.paint}></input>

        Year
        <input type="text" name = "year" onChange={(e) => {setYear(e.target.value)}}
         defaultValue={props.editDoc.year} placeholder={props.editDoc.year}></input>

        Description
        <input type="textArea" name = "description" onChange={(e) => {setDescription(e.target.value)}}
         defaultValue={props.editDoc.description} placeholder={props.editDoc.description}></input>
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
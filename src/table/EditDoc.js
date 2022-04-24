import React, {useState} from 'react'
import { db, app, projectStorage, auth } from '../firebaseConfig'
import { collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore"
// import { getStorage, ref, deleteObject, getMetadata } from "firebase/storage"
// import { assertIsStringOrUndefined } from 'firebase-tools/lib/utils'


const  EditDoc = (props) => {

  
  const [category, setCategory] = useState ()
  const [size, setSize] = useState();
  const [technique, setTechnique] = useState(null);
  const [price, setPrice] = useState(null);
  const [year, setYear] = useState(null);
  const [description, setDescription] = useState();

  // const [newDoc, setNewDoc] = useState({});
  // console.log (props.editDoc)


  const formHandler = async (e) => {
    e.preventDefault();

      try {
        var category_ = category
        if (category_ === undefined && props.editDoc.category !== undefined) {
          category_ = props.editDoc.category  // copy old value
        }
        // if (category_ === undefined) {
        //   setCategory('?')
        //   category_="?"
        // }

        var size_ = size;
        if (size_ === undefined && props.editDoc.size !== undefined) {
          size_ = props.editDoc.size   // copy old value
        }
        // if (size_ === undefined){
        //   setSize('?')
        //   size_="?"
        // }

        var technique_ = technique;
        if (technique_ === undefined && props.editDoc.technique !== undefined) {
          technique_ = props.editDoc.technique   // copy old value
        }
        // if (technique_ === undefined){
        //    setTechnique('?')
        //    technique_ = "?"
        // }

        var price_ = price
        if (price_ === undefined && props.editDoc.price !== undefined) {
          price_ = props.editDoc.price   // copy old value
        }
        // if (price_ === undefined){
        //   setPrice('?')
        //   price_ = "?";
        // }

        var year_ = year
        if (year_ === undefined && props.editDoc.year !== '')
          year_ = props.editDoc.year   // copy old value
        // if (year_ === undefined) {
        //   setYear('?')
        //   year_="?"
        // }

        var description_ = description;
        if (description_ === undefined && props.editDoc.description !== undefined)
          description_ = props.editDoc.description   // copy old value
        // if (description_ === undefined) {
        //   setDescription('?')
        //   description_ = "?"
        // }


        // send doc to firebase
        const picturesRef = collection(db, props.galery);
        await addDoc (picturesRef, {fileName: props.editDoc.fileName, fileUrl: props.editDoc.fileUrl, file_kb: props.editDoc.file_kb, fileType: props.editDoc.fileType, fileScanned: props.editDoc.fileScanned, category: category_, size: size_, technique: technique_, price: price_, year: year_, description: description_})  // 

        // delete doc
        var imageDoc = doc(db, props.galery, props.editDoc.id);
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
          <hr/>    <hr/>
          <h5> {props.editDoc.fileName} </h5>

          Category
          <input type="text" name = "category" onChange={(e) => {setCategory(e.target.value)}}
          defaultValue={props.editDoc.category} placeholder={props.editDoc.category}/>

          Size
          <input type="text" name = "size" onChange={(e) => {setSize(e.target.value)}}
          defaultValue={props.editDoc.size} placeholder={props.editDoc.size}></input>
        </div>

        Technique
        <input type="text" name = "technique" onChange={(e) => {setTechnique(e.target.value)}}
        defaultValue={props.editDoc.technique} placeholder={props.editDoc.technique}></input>
      
        Year
        <input type="text" name = "year" onChange={(e) => {setYear(e.target.value)}}
         defaultValue={props.editDoc.year} placeholder={props.editDoc.year}></input>

        Price
        <input type="text" name = "price" onChange={(e) => {setPrice(e.target.value)}}
        defaultValue={props.editDoc.price}  placeholder={props.editDoc.price}></input>
        

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
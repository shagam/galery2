import React, {useState} from 'react'
import { db, app, projectStorage, auth } from '../firebaseConfig'
import { collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore"
// import { getStorage, ref, deleteObject, getMetadata } from "firebase/storage"
// import { assertIsStringOrUndefined } from 'firebase-tools/lib/utils'
import { Form, Button, Card, Alert } from 'react-bootstrap'

const  EditDoc = (props) => {

  const [category, setCategory] = useState ()
  const [size, setSize] = useState();
  const [technique, setTechnique] = useState(props.editDoc.technique);
  // const [technique, setTechnique] = useState('water');
  const [price, setPrice] = useState(null);
  const [year, setYear] = useState(null);
  const [description, setDescription] = useState();
  const [error, setError] = useState ();

  // const [newDoc, setNewDoc] = useState({});
  // console.log (props.editDoc)


  const formHandler = async (e) => {
    e.preventDefault();
      setError('');
      try {
        var category_ = category
        if (category_ === undefined && props.editDoc.category !== undefined) {
          category_ = props.editDoc.category  // copy old value
        }

        var size_ = size;
        if (size_ === undefined && props.editDoc.size !== undefined) {
          size_ = props.editDoc.size   // copy old value
        }
    
        var technique_ = technique;
        if (technique_ === undefined && props.editDoc.technique !== undefined) {
          technique_ = props.editDoc.technique   // copy old value
        }

        var price_ = price
        if (price_ === undefined && props.editDoc.price !== undefined) {
          price_ = props.editDoc.price   // copy old value
        }

        var year_ = year
        if (year_ === undefined && props.editDoc.year !== '')
          year_ = props.editDoc.year   // copy old value

        var description_ = description;
        if (description_ === undefined && props.editDoc.description !== undefined)
          description_ = props.editDoc.description   // copy old value


        // delete doc
        var imageDoc = doc(db, props.galery, props.editDoc.id);
        await deleteDoc (imageDoc);


        // send doc to firebase
        const picturesRef = collection(db, props.galery);
        await addDoc (picturesRef, {fileName: props.editDoc.fileName, fileUrl: props.editDoc.fileUrl, file_kb: props.editDoc.file_kb, fileType: props.editDoc.fileType, fileScanned: props.editDoc.fileScanned, category: category_, size: size_, technique: technique_, price: price_, year: year_, description: description_})  // 

        props.getPictures(); 
        props.setEditDoc(undefined);
      } catch (e) {setError(e.message) && console.log (e)}
  }

  const techList = ['gouash', 'oil', 'water', 'graphit', 'sketch', 'black&white'];

return (

  <div>
    {error && <Alert variant="danger"> {error} </Alert>}
    {/* <div>Edit</div> */}
    <form onSubmit={formHandler} >
     <div>
       <div>
          <hr/>    <hr/>
          <h5> {props.editDoc.fileName} </h5>

          <div  style={{display: 'flex', color: 'red', height: '2em'}}>
            Technique: &nbsp;&nbsp;&nbsp;&nbsp;
            {techList.map((tech) => (
              <>
                <input type='radio' name='techniqe' value={tech} checked={technique === tech} onChange={(e)=>setTechnique(e.target.value)} /> 
                {tech}&nbsp;&nbsp;&nbsp;
              </>
            ))}
          </div>

          Category
          &nbsp;<input type="text" name = "category" onChange={(e) => {setCategory(e.target.value)}}
          defaultValue={props.editDoc.category} placeholder={props.editDoc.category}/>

          &nbsp;Size
          &nbsp;<input type="text" name = "size" onChange={(e) => {setSize(e.target.value)}}
          defaultValue={props.editDoc.size} placeholder={props.editDoc.size}></input>
        </div>

        Year
        &nbsp;<input type="text" name = "year" onChange={(e) => {setYear(e.target.value)}}
         defaultValue={props.editDoc.year} placeholder={props.editDoc.year}></input>

        &nbsp;Price
        &nbsp;<input type="text" name = "price" onChange={(e) => {setPrice(e.target.value)}}
        defaultValue={props.editDoc.price}  placeholder={props.editDoc.price}></input>
        
        <div>
          Description
          {/* <div>
            <input type="textarea" name = "description" onChange={(e) => {setDescription(e.target.value)}}
            defaultValue={props.editDoc.description} placeholder={props.editDoc.description}></input>
          </div> */}
          <div>
          <textarea rows="3" cols="90" name = "description" 
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
import React, {useState} from 'react'
import { db } from '../firebaseConfig'
import { collection, addDoc, doc, deleteDoc} from "firebase/firestore"
// import { getStorage, ref, deleteObject, getMetadata } from "firebase/storage"
// import { assertIsStringOrUndefined } from 'firebase-tools/lib/utils'
import { Alert } from 'react-bootstrap'

// import Category from './Category';

const  EditDoc = (props) => {
  const [title, setTitle] = useState (props.editDoc.title)
  const [category, setCategory] = useState (props.editDoc.category)
  const [size, setSize] = useState(props.editDoc.size);
  const [technique, setTechnique] = useState(props.editDoc.technique);
  const [price, setPrice] = useState(props.editDoc.price);
  const [year, setYear] = useState(props.editDoc.price);
  const [description, setDescription] = useState(props.editDoc.description);

  const [error, setError] = useState ();

  // const [newDoc, setNewDoc] = useState({});
  // console.log (props.editDoc)

  function abort () {
    props.setEditDoc(undefined);
  }
  const categoryList =['Other','Landscape', 'Structure', 'Nature','Fabrique']
  if (category === '')
    setCategory (categoryList[0])

  const formHandler = async (e) => {
    e.preventDefault();
      setError('');

      if (category === 'all' || category === '') {
        setError ('Please choose category (' + category +')')
        return;
      }
      if (technique === '') {
        setError ('Please choose technique (' + technique +')')
        return
      }

      try {
        var category_ = category
        if (category_ === undefined && props.editDoc.category !== undefined) {
          category_ = props.editDoc.category  // copy old value
        }
        if (category_ === undefined || category_ === 'all')
          category_ = 'other';

        var title_ = title;
        if (title_ === undefined && props.editDoc.title !== undefined) {
          title_ = props.editDoc.title   // copy old value
        }
        if (title_ === undefined || props.editDoc.title === undefined) 
          title_ = ''// props.editDoc.fileName;

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
        else
          description_ = '';


        // delete doc
        var imageDoc = doc(db, props.gallery, props.editDoc.id);
        await deleteDoc (imageDoc);


        // send doc to firebase
        console.log ('Edit', props.editDoc, 'title:', title_, 'category:', category_, 'size:', size_, 'technique:', technique_, 'price:', price_, 'year:', year_, 'description:', description_)
        const picturesRef = collection(db, props.gallery);
        await addDoc (picturesRef, {title: title_, fileName: props.editDoc.fileName, fileUrl: props.editDoc.fileUrl, file_kb: props.editDoc.file_kb, fileType: props.editDoc.fileType, fileScanned: props.editDoc.fileScanned, category: category_, size: size_, technique: technique_, price: price_, year: year_, description: description_})  // 

        props.getPictures(); 
        props.setEditDoc(undefined);
        props.setSelectedDoc(undefined);
      } catch (e) {setError(e.message) && console.log (e)}
  }

  const techList = ['gouash', 'oil', 'water', 'etching', 'black&white', 'sketch'];




// width:'1.2em', height:'1.5em'
return (

  <div>
    {error && <Alert variant="danger"> {error} </Alert>}
    {/* <div>Edit</div> */}
    <form onSubmit={formHandler} >

     <div>
     <hr/>   

          <div  style={{ zoom: '35%'}}>
            <img src={props.editDoc.fileUrl} alt="enlarged pic" />
          </div>
          <hr/>  
          <div style={{display:'flex'}}> 
            <hr/>    <hr/>
            &nbsp;&nbsp;<strong>Title:</strong>&nbsp;
            <input style={{ 'width': '10vw', 'height': '3vh'}}type="text" name = "title" onChange={(e) => {setTitle(e.target.value)}}
            defaultValue={props.editDoc.title} placeholder={props.editDoc.title}></input>

              &nbsp;&nbsp;fileName: 
            <div  style={{color:'magenta', 'fontSize':'1.8vw'}}>
            <strong> &nbsp; {props.editDoc.fileName}</strong>
            </div>
          </div>
          <hr/>  
          <div>
              &nbsp; &nbsp; <strong>Technique:</strong> &nbsp;
            <select   value={technique}  onChange={(e) =>setTechnique (e.target.value)} >
              {techList.map((tech) => (
                  <option key={tech} value={tech} > {tech} &nbsp; </option> 
              ))}  
            </select>

          &nbsp; &nbsp;<strong>Category:</strong> &nbsp;
            <select   value={category}  onChange={(e) =>setCategory (e.target.value)} >
              {categoryList.map((cat) => (
                  <option key={cat} value={cat} > {cat} &nbsp; </option> 
              ))}  
            </select>
          </div>

          <hr/>  
          &nbsp;&nbsp;<strong>Size:</strong>&nbsp;
          <input style={{ 'width': '10vw', 'height': '3vh'}}type="text" name = "size" onChange={(e) => {setSize(e.target.value)}}
          defaultValue={props.editDoc.size} placeholder={props.editDoc.size}></input>

        &nbsp;&nbsp;<strong>Year:</strong>&nbsp;
        <input style={{ 'width': '10vw'}} type="text" name = "year" onChange={(e) => {setYear(e.target.value)}}
         defaultValue={props.editDoc.year} placeholder={props.editDoc.year}></input>

        &nbsp;&nbsp;<strong>Price:</strong>&nbsp;
        <input style={{ 'width': '10vw'}} type="text" name = "price" onChange={(e) => {setPrice(e.target.value)}}
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
     <button type="submit" onClick={abort} > abort </button> 
     <hr/>


     {/* {error && <div className='error'>{error}</div>} */}
     {/* {files && <div> {files} </div>} */}
   </form>
  </div>
   
  )
}

export default EditDoc;
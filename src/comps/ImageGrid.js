
import React, { useState, useEffect } from "react";

import { db } from '../firebaseConfig'
// import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs} from "firebase/firestore";
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
// import {Document, Page, pdgjs} from 'react-pdf';

import UploadForm from './UploadForm'
import Modal from "./Modal";
import ImageTable from '../table/ImageTable'
import GlobalFilter from './GlobalFilter'
// import Category from '../comps/Category';
// import InputNumber from './InputNumber';
import CustomSelect from './CustomSelect'
import EditDoc from './EditDoc'
import { Represent } from "./Represent";
import MobileContext from './MobileContext';
// import MobileContext from './MobileContext';

// import MobileContext from './MobileContext'

const ImageGrid = (props) => {
  const [docs, setDocs] = useState([]);
  const [docsFiltered, setDocsFiltered] = useState([]);
  const [category, setCategory] = useState ('all')


  const picturesRef = collection(db, props.gallery);
  const [selectedDoc, setSelectedDoc] = useState (null)
  const { currentUser, admin } = useAuth();
  const [error, setError] = useState();
  const [globalFilter, setGlobalFilter] = useState();
  const [tableFlag, setTableFlag] = useState(false);
  const [editDoc, setEditDoc] = useState();

  const [gridTemplateColumns, setGridTemplate]  = useState('1fr 1fr 1fr')
  const { userAgentMobile } = MobileContext();

  // const { userAgentMobile} = MobileContext();

  function setEditDoc_ (editDoc) {
    setEditDoc(editDoc);
  }

  const getPictures = async () => {
    try {
      let documents = [];
      const unsub =  await getDocs (picturesRef);

      for (let i = 0; i < unsub.docs.length; i++) {
        const doc = unsub.docs[i].data();
        if (doc.fileName === undefined)  // empty document?
          continue;
        const id = unsub.docs[i].id;
        documents.push({...doc, id: id})
      }
      console.log ('getPictuires ', documents.length)
      setDocs (documents);
      // setAllDocs (documents);
      console.log (documents);
      return unsub;
    } catch (e) {setError(e.message) && console.log (e)}

  }

  // eslint-disable-next-line
  
  useEffect (() => { // eslint-disable-line
    getPictures ();  // eslint-disable-line
  }, []);  // eslint-disable-line

  useEffect (() => {
  
    function filterCase (str) {
      if (str === undefined || str === null)
        return true;
      if (globalFilter === undefined || globalFilter === null)
        return true;
      return str.toUpperCase().includes(globalFilter.toUpperCase());
    }
      
    const filter = (doc) => {
      if (globalFilter === undefined || globalFilter === '')
        return true;
      if (doc.title !== undefined && filterCase(doc.title))
        return true;
      if (doc.fileName !== undefined && filterCase(doc.fileName))
        return true;
      if (doc.category !== undefined && doc.category !== null &&  filterCase(doc.category))
        return true;
      if (doc.descrition !== undefined && doc.descrition !== null && filterCase(doc.descrition))
        return true;
      if (doc.technique !== undefined && doc.technique !== null && filterCase(doc.technique))
        return true;      
      return false;
    }
  
    // console.log (category)
    var list = [];
    for (let i = 0; i < docs.length; i++) {
      // filter according to globalFilter && category
      if (! filter(docs[i]))
        continue;
      
      if (category === undefined || category === 'all' || category === docs[i].category)
        list.push(docs[i]);
    }
    setDocsFiltered(list);

  }, [docs, globalFilter, category]);

  
  const tableFlagChange = () => {setTableFlag (! tableFlag)}

  var img_grid  = {
    width: '95vw',
    'backgroundSize': 'cover',
    /* width: 130%!important; */
    /* margin: 20px auto; */
    display: 'grid',
    // 'grid-template-columns': '1fr 1fr 1fr',
    'gridTemplateColumns':  gridTemplateColumns ,
    'gridGap': '10px'
    /* justify-content: start; */
  }

  const categoryList =['all', 'Landscape', 'Building', 'Fabrique','stickers','fruits', 'Other']

  const emailFontSize = userAgentMobile ? '3vw' : '1.4vw'

  const imagePerRowOptions = [
    {label: '1_images_per_row', value: '1fr'},
    {label: '2_images_per_row', value: '1fr 1fr'},
    {label: '3_images_per_row', value: '1fr 1fr 1fr'},
    {label: '4_images_per_row', value: '1fr 1fr 1fr 1fr'},
    {label: '5_images_per_row', value: '1fr 1fr 1fr 1fr 1fr'},
    {label: '6_images_per_row', value: '1fr 1fr 1fr 1fr 1fr 1fr'},
    {label: '7_images_per_row', value: '1fr 1fr 1fr 1fr 1fr 1fr 1fr'},
    {label: '8_images_per_row', value: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'},
  ]

  function layoutChange (value) {
    localStorage.setItem('grid', value.value)
    setGridTemplate (value.value);
    // console.log (value)
  }

  // const fontSizeStyle = userAgentMobile ? '2.8vw' :'2.0vw'

  return (
    <div>
      <div style={{display:'flex'}}>
        <h2><strong>{props.name}</strong>  ({docs.length})  </h2>
        <div style={{color:'blue', 'fontSize':{emailFontSize}, 'marginTop': '0.9vh'}}>&nbsp;&nbsp; {props.adminEmail}</div> 
      </div>

      {! selectedDoc && <div>

        <div style={{display:'flex'}}> 
          {currentUser && <div><strong>  {currentUser.email}</strong> </div> }
          {admin && <div> &nbsp; <strong>(admin) </strong> </div>}
        </div>
         <Link to="/dashboard" > DashBoard (Login)</Link>
          {/* <div className='w-100 text-left mt-2'> */}
            &nbsp; &nbsp; &nbsp; 
            {props.gallery==='dina' && <Link to="/Dina_CV" >Dina Goldstein CV</Link>}
            &nbsp; &nbsp; &nbsp; 
            {props.gallery==='dina' && <Link to="/exibitions" >Exibitions</Link>}

        <hr/>

        {admin && ! selectedDoc && <UploadForm getPictures = {getPictures} gallery = {props.gallery}/> }

        {error && <div className='error'>{error}</div>} 

        { <div> <input type="checkbox" checked={tableFlag} onChange={tableFlagChange}/> table </div>}

        {/* <div>
          <strong>Category:</strong> &nbsp;
            <select   value={category}  onChange={(e) =>setCategory (e.target.value)} >
              {categoryList.map((cat) => (
                  <option key={cat} value={cat} > {cat} &nbsp; </option> 
              ))}  
          </select>
        </div> */}


        {! tableFlag && <div style={{}}>

          <div style={{display:'flex'}}>
            <GlobalFilter className="stock_button_class" filter={globalFilter} setFilter={setGlobalFilter}  />
            &nbsp; ({docsFiltered.length}) &nbsp;&nbsp;
            <CustomSelect options={imagePerRowOptions} label='layout' onChange={layoutChange } defaultValue={imagePerRowOptions[2]} />
          </div>
          <hr/>
          { docsFiltered && <h3> &nbsp; <strong> Click image to focus </strong> </h3>}

          <div  style={img_grid}>

            {docsFiltered && docsFiltered.map(doc => {
              const {fileName, fileType, fileUrl, category, technique, size, year, title} = doc;
              (size === undefined || year === undefined) && console.log (size,year)
              return <div key={fileName}>        
                <div className="img-wrap" 
                  onClick={() => setSelectedDoc(doc)} >
                  {(fileType === 'image/jpeg' || fileType === 'image/png') &&
                    <img src={fileUrl} alt={fileName} />}
                  {doc.fileType === 'application/pdf' &&
                    <iframe src={doc.fileUrl} title={fileName} />   }
                </div>
                <div  style_={{display:'flex'}}>
                  <div style={{color:'magenta', 'fontSize':'1.8vw'}}> {title}  &nbsp;  </div>
                  <div style= {{'fontSize':'1.6vw' }}> ({category}, {technique})</div>
                </div>
              </div> 
            })}
          </div>
        </div>}

        { tableFlag && <ImageTable docs={docsFiltered} setSelectedDoc={setSelectedDoc} getPictures = {getPictures} gallery = {props.gallery} />}

      </div>}

      {selectedDoc && ! editDoc && <Modal selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc} getPictures = {getPictures} gallery = {props.gallery} setEditDocGallery={setEditDoc_} /> }

      {editDoc && <EditDoc editDoc={editDoc} getPictures = {getPictures} setEditDoc={setEditDoc} gallery = {props.gallery} setSelectedDoc={setSelectedDoc}/>}

      {!editDoc && !selectedDoc && <Represent docs={docs} setCategory={setCategory}/>}
      <hr/>  
    </div>
  )
}

export default ImageGrid;
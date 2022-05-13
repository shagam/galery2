import React, { useState, useEffect } from "react";

import { db } from '../firebaseConfig'
// import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
// import {Document, Page, pdgjs} from 'react-pdf';

import UploadForm from './UploadForm'
import Modal from "./Modal";
import ImageTable from '../table/ImageTable'
import GlobalFilter from '../table/GlobalFilter'
import Category from '../comps/Category';
import MobileContext from './MobileContext'

const ImageGrid = (props) => {
  const [docs, setDocs] = useState([]);
  const [docsFiltered, setDocsFiltered] = useState([]);
  const [category, setCategory] = useState ('any')


  const picturesRef = collection(db, props.gallery);
  const [selectedDoc, setSelectedDoc] = useState (null)
  const { currentUser, admin } = useAuth();
  const [error, setError] = useState();
  const [globalFilter, setGlobalFilter] = useState();
  const [tableFlag, setTableFlag] = useState(false);

  const { userAgentMobile, isAndroid, isIPhone} = MobileContext();

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

  useEffect (() => {
    getPictures ();
  }, []);

  useEffect (() => {
    console.log (category)
    var list = [];
    for (let i = 0; i < docs.length; i++) {
      // filter according to globalFilter && category
      if (! filter(docs[i]))
        continue;
      
      if (category === undefined || category === 'any' || category === docs[i].category)
        list.push(docs[i]);
    }
    setDocsFiltered(list);

  }, [docs, globalFilter, category]);

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

  const tableFlagChange = () => {setTableFlag (! tableFlag)}
  // (! userAgentMobile || tableFlag) && 

  return (
    <div >
      <h2>Image Gallery  <strong> {props.name}</strong>   ({docs.length})  </h2>

      <div style={{display:'flex'}}>
        {currentUser && <div><strong> </strong>  {currentUser.email}</div> }
        {admin && <div> &nbsp; <strong>(admin) </strong> </div>}
        &nbsp; &nbsp;  <Link to="/dashboard" > DashBoard (Login) </Link>

      </div>
      
      <div className='w-100 text-left mt-2'> <Link to="/Dina_CV" > Dina Goldstein CV</Link> </div>

      <div className='w-100 text-left mt-2'> <Link to="/exibitions" > Exibitions</Link> </div>

      {/* <div> <Link to="/cv" > Dina Goldstein CV</Link> </div> */}
      <hr/>

      {(admin || false) && ! selectedDoc && <UploadForm getPictures = {getPictures} gallery = {props.gallery}/> }
      {error && <div className='error'>{error}</div>}

      {<Category category = {category} setCategory = {setCategory}/>}

      {admin && <div> <input type="checkbox" checked={tableFlag} onChange={tableFlagChange}/> table </div>}
    
      {! tableFlag && <div style={{}}>
        <GlobalFilter className="stock_button_class" filter={globalFilter} setFilter={setGlobalFilter}  />
        {/* <hr/> */}
        
    
        { docsFiltered && <h3> &nbsp; <strong> Click image to focus </strong> </h3>}

        <div className="img-grid">

          {! selectedDoc && docsFiltered && docsFiltered.map(doc => {
            const {fileName, fileType, fileUrl, category, technique, size, year} = doc;
            return <div key={fileName}>        
              <div className="img-wrap" 
                onClick={() => setSelectedDoc(doc)} >
                {(fileType === 'image/jpeg' || fileType === 'image/png') &&
                  <img src={fileUrl} alt={fileName} />}
                {doc.fileType === 'application/pdf' &&
                  <iframe src={doc.fileUrl} title={fileName} />   }
              </div>
              <div  style_={{display:'flex'}}>
                <div style={{color:'magenta', 'fontSize':'1.8vw'}}> {fileName}  &nbsp;  </div>
                <div style= {{'fontSize':'1.6vw' }}> {category} &nbsp; {technique}</div>
              </div>
            </div> 
          })}
        </div>
      </div>}


      {selectedDoc && <Modal selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc} getPictures = {getPictures} gallery = {props.gallery}/> }


      { ! selectedDoc && tableFlag && <ImageTable docs={docsFiltered} setSelectedDoc={setSelectedDoc} getPictures = {getPictures} gallery = {props.gallery} />}
      <hr/>  
    </div>
  )
}

export default ImageGrid;
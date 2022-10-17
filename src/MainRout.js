import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Link } from 'react-router-dom'
import {collection, getDocs} from "firebase/firestore";
import { db } from './firebaseConfig'


import { useAuth } from './contexts/AuthContext';

import { Represent } from "./comps/Represent";
import ImageGrid from './comps/ImageGrid';
import Modal from "./comps/Modal";
import EditDoc from "./comps/EditDoc";

import Signup from './auth/Signup';
import Dashboard from './auth/Dashboard'
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import UpdateProfile from './auth/UpdateProfile';

import DinaCV from './cv/DinaCV'
import Exibitions from './cv/Exibitions'
import Contact from './comps/Contact'
import ImageTable from './table/ImageTable'
import CustomSelect from './comps/CustomSelect'

export function MainRout () {

  const [docs, setDocs] = useState([]);
  const [error, setError] = useState();
  const categoryList =['', 'Landscape', 'Building', 'Fabrique','Stickers','Fruits', 'Other']
  const { currentUser, admin } = useAuth();
  const [selectedDoc, setSelectedDoc] = useState (null)
  const [adminId, setAdminId] = useState(0);


  const adminsEmail = {
    dina: process.env.REACT_APP_FIREBASE_dina,
    eli: process.env.REACT_APP_FIREBASE_eli,
    // shlomit: process.env.REACT_APP_FIREBASE_shlomit
  }
  // console.log (admins.dina, admins.test, admins.shlomit)

  const admins = [
    {gallery: "dina", name: "Dina Goldstein", email: adminsEmail.dina},
    {gallery: "test",  name: "test", email: adminsEmail.eli},
  ]
  
  const picturesRef = collection(db, admins[adminId].gallery);
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

  const adminOptions = [
    {label: admins[0].gallery, value: 0},
    {label: admins[1].gallery, value: 1},
  ]
  function adminChange (value) {
    localStorage.setItem('admin', value.value)
    setAdminId (value.value);
    console.log (value)
  }


return (
  <div>
    <div style={{display:'flex'}}>
      <h2 style={{color:'green'}}> &nbsp; Image Gallery &nbsp;&nbsp; </h2>
      <h2><strong>{admins[adminId].name}</strong>  ({docs.length})  </h2>
      {/* <CustomSelect options={adminOptions} label='&nbsp;&nbsp;&nbsp;  gallery' onChange={adminChange } defaultValue={adminOptions[0]} /> */}
    </div>
    <div style={{display:'flex'}}> 
      {currentUser && <div><strong> &nbsp;&nbsp; {currentUser.email}</strong> </div> }
      {admin && <div> &nbsp; <strong>(admin) </strong> </div>}
  </div>

  <Container  className='d-flex align-items-left justify-content-left' style={{minHeight: "50vh", minWidth: "100%"}}  >

    <Router>
      <Routes>
        <Route path='/' element ={ <Represent docs={docs} gallery={admins[adminId].gallery} getPictures = {getPictures}  /> } />
        <Route exact path ="/dashBoard"  element={<Dashboard admins= {admins}/>}/>

        <Route path="/contact" element={<Contact/> } />
        <Route path="/signup" element={<Signup/> } />
        <Route path="/login" element={<Login/> }/>
        <Route path="/forgotPassword" element={<ForgotPassword />}/>
        <Route path="/update-profile" element={<UpdateProfile  />}/>

        <Route path={'/table'} element={<ImageTable docs={docs} setSelectedDoc={setSelectedDoc} getPictures = {getPictures} gallery = {admins[adminId].gallery} />} />

        {categoryList.map ((cat) => {
          const rt = "/" + cat;
          return (
            <Route key={cat} path={rt} element={<ImageGrid gallery={admins[adminId].gallery} 
            name={admins[adminId].name} adminEmail={admins[adminId].email} category={cat} docs={docs} getPictures = {getPictures} 
            selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc} />} />
          )
        })}

        { docs.map ((doc) => {
          const rt = '/' + doc.fileName;
            return (
              <Route key={doc.fileName} path={rt} element={<Modal selectedDoc = {doc}  setSelectedDoc={setSelectedDoc} getPictures = {getPictures} gallery = {admins[adminId].gallery}  />} />
            )
          })
        }

        <Route path={'/modal'} element={<Modal selectedDoc = {selectedDoc}  setSelectedDoc={setSelectedDoc}
          getPictures = {getPictures} gallery = {admins[adminId].gallery}  />} />


        <Route path={'/editDoc'} element={<EditDoc  editDoc = {selectedDoc} setEditDoc={setSelectedDoc} 
          getPictures = {getPictures} gallery = {admins[adminId].gallery} /> }  />

        <Route path="/dina_cv" element={<DinaCV />}/>                    
        <Route path="/exibitions" element={<Exibitions />}/>  

      </Routes>
    </Router>
  </Container>
</div>
)
}

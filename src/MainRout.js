import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {collection, getDocs} from "firebase/firestore";
import { db } from './firebaseConfig'


import { useAuth } from './contexts/AuthContext';

import { Represent } from "./comps/Represent";
import ImageGrid from './comps/ImageGrid';

import Signup from './auth/Signup';
import Dashboard from './auth/Dashboard'
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import UpdateProfile from './auth/UpdateProfile';

import DinaCV from './cv/DinaCV'
import Exibitions from './cv/Exibitions'
import Contact from './comps/Contact'

export function MainRout () {

  const [docs, setDocs] = useState([]);
  const [error, setError] = useState();
  const categoryList =['', 'Landscape', 'Building', 'Fabrique','Stickers','Fruits', 'Other']
  const { currentUser, admin } = useAuth();

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
  

   const adminId = 0;

  const picturesRef = collection(db, admins[0].gallery);
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


return (
  <div>
  <h2 style={{color:'green'}}> &nbsp; Image Gallery  </h2>

  {/* <div style={{display:'flex'}}> 
    {currentUser && <div><strong>  {currentUser.email}</strong> </div> }
    {admin && <div> &nbsp; <strong>(admin) </strong> </div>}
  </div> */}


  <Container  className='d-flex align-items-left justify-content-left' style={{minHeight: "50vh", minWidth: "100%"}}  >

    <Router>

      <Routes>
        <Route path='/' element ={ <Represent docs={docs}/> } />
        <Route exact path ="/dashBoard"  element={<Dashboard admins= {admins}/>}/>
        {/* <Route path="/" element={<Dashboard/>}   /> */}

        <Route path="/contact" element={<Contact/> } />
        <Route path="/signup" element={<Signup/> } />
        <Route path="/login" element={<Login/> }/>
        <Route path="/forgotPassword" element={<ForgotPassword />}/>
        <Route path="/update-profile" element={<UpdateProfile  />}/>

        {categoryList.map ((cat) => {
          const rt = "/" + cat;
          return (
            <Route key={cat} path={rt} element={<ImageGrid gallery={admins[adminId].gallery} 
            name={admins[adminId].name} adminEmail={admins[adminId].email} category={cat} docs={docs} getPictures = {getPictures} />} />
          )
        })}

        <Route path="/dina_cv" element={<DinaCV />}/>                    
        <Route path="/exibitions" element={<Exibitions />}/>  

      </Routes>
    </Router>
  </Container>
</div>
)
}

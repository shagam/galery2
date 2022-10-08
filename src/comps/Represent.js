import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import MobileContext from './MobileContext';

export function Represent (props) {
  const [repDocs, setRepDocs] = useState()
  const [category, setCategory] = useState()
  const { userAgentMobile } = MobileContext();


  const LOG = false;
  function collectReps () {
    // collect all checkedBox reps
    var repsArray = [];
    var repDocs_ = [];

    for (let i = 0; i < props.docs.length; i++) {
      if (props.docs[i].represent && ! repsArray.includes(props.docs[i].category)) { // uniqu rep
        repsArray.push (props.docs[i].category)
        repDocs_.push(props.docs[i])
      }
    }

    // fill missing categories. if no check choose first
    for (let i = 0; i < props.docs.length; i++) {
      if ( ! repsArray.includes(props.docs[i].category)) { // uniqu rep
        repsArray.push (props.docs[i].category)
        repDocs_.push(props.docs[i])
      }
    }
    // var str = '';
    // for (let i = 0; i < repDocs_.length; i++)
    //   str += repDocs_[i].fileName + ' (' + repDocs_[i].category + ')  ';
    // console.log (str)

    if (LOG)
      console.log (repsArray)
    if (repDocs_.length > 0)
      setRepDocs(repDocs_)
    
  }

  useEffect (() => {
  if (props.docs && props.docs.length > 0 && (! repDocs || repDocs.length === 0)) {
    if (LOG) 
      console.log (props.docs.length)
    collectReps()
  }
  });


  function fontSize (s) {
    if (userAgentMobile)
      return s*7 + 'vw'
    else
      return s + 'vw';
  }

  var img_grid  = {
    width: '30vw',
    'backgroundSize': 'cover',
    /* width: 130%!important; */
    /* margin: 20px auto; */
    display: 'grid',
    // 'grid-template-columns': '1fr 1fr 1fr',
    'gridTemplateColumns':  '1fr 1fr 1fr' ,
    'gridGap': '10px'
    /* justify-content: start; */
  }

  return (
    <div>
      <div style= {{display: 'flex', fontSize:'3vw', color: 'magenta' }}> Choose Category </div>    
      {/* <hr/>        <hr/> */}
      <div style={img_grid}>
        {repDocs && repDocs.map(doc => {

          const {fileName, fileType, fileUrl, category, technique, size, year, title} = doc;
          const link = '/' + category;

          return <div key={fileName}>
      
            <div>
              <Link to={link}   >
               <div  style={{ zoom: '50%', margin: '30px'}}>

                  <div style= {{'fontSize': fontSize(4) }}> {category}</div>
                  <br></br> 
                  <img src={fileUrl} alt="categoryImg" />

                </div>
              </Link>

            </div>
          </div> 
        })}
 
      </div>
    </div>
  )

}
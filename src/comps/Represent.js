import React, { useState } from "react";


export function Represent (props) {
  const [repDocs, setRepDocs] = useState()
  const [category, setCategory] = useState()

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
    var str = '';
    for (let i = 0; i < repDocs_.length; i++)
      str += repDocs_[i].fileName + ' (' + repDocs_[i].category + ')  ';

    console.log (repsArray, str)
    if (repDocs_.length > 0)
      setRepDocs(repDocs_)
    
  }

  // useEffect (() => { // eslint-disable-line
  //   getPictures ();  // eslint-disable-line
  // }, []);  // eslint-disable-line

  if (props.docs && props.docs.length > 0 && (! repDocs || repDocs.length === 0)) {
    console.log (props.docs.length)
    collectReps()
  }

  var img_grid  = {
    width: '95vw',
    'backgroundSize': 'cover',
    /* width: 130%!important; */
    /* margin: 20px auto; */
    display: 'grid',
    // 'grid-template-columns': '1fr 1fr 1fr',
    'gridTemplateColumns':  '1fr 1fr' ,
    'gridGap': '10px'
    /* justify-content: start; */
  }

  return (
    <div style={img_grid}>
      {repDocs && repDocs.map(doc => {
          const {fileName, fileType, fileUrl, category, technique, size, year, title} = doc;
          (size === undefined || year === undefined) && console.log (size,year)
          return <div key={fileName}>        
            <div className="img-wrap" 
              onClick={() => setCategory(doc.category)} >
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

  )

}
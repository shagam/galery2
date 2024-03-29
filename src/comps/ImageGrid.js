
import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom'
import GlobalFilter from './GlobalFilter'
import CustomSelect from './CustomSelect'

import MobileContext from './MobileContext';
;


const ImageGrid = (props) => {

  const [docsFiltered, setDocsFiltered] = useState([]);
  const [error, setError] = useState();
  const [globalFilter, setGlobalFilter] = useState();

  const [gridTemplateColumns, setGridTemplate]  = useState('1fr 1fr 1fr')
  const { userAgentMobile } = MobileContext();

  const LOG = true;

  // const { userAgentMobile} = MobileContext();
  console.log ('ImageGrid:', props.category)
  function setEditDoc_ (editDoc) {
    props.setEditDoc(editDoc);
  }

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
    for (let i = 0; i < props.docs.length; i++) {
      // filter according to globalFilter && category
      if (! filter(props.docs[i]))
        continue;
      
      if (props.category === undefined || props.category === 'all' || props.category === props.docs[i].category)
        list.push(props.docs[i]);
    }
    if (LOG)
      console.log ('fitered:', list)
    setDocsFiltered(list);

  }, [props.docs, globalFilter, props.category, LOG]);

  function fontSize (s) {
    if (userAgentMobile)
      return s*7 + 'vw'
    else
      return s + 'vw';
  }

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

        {/* <div style={{color:'blue', 'fontSize':{emailFontSize}, 'marginTop': '0.9vh'}}>&nbsp;&nbsp; {props.adminEmail}</div>  */}
      </div>

      {<div>

        {error && <div className='error'>{error}</div>} 

        {props.category !== '' && <div style={{}}>

          <div style={{display:'flex'}}>

            <GlobalFilter className="stock_button_class" filter={globalFilter} setFilter={setGlobalFilter}  />
            &nbsp; ({docsFiltered.length}) &nbsp;&nbsp;
            <CustomSelect options={imagePerRowOptions} label='layout' onChange={layoutChange } defaultValue={imagePerRowOptions[2]} />
            &nbsp;&nbsp;<Link to={'/'}  onClick={() => {}} >home</Link>
          </div>


          <div style={{display:'flex', 'marginTop': '0.9vh'}}> 
            <div style= {{color: 'red', fontSize:'4vw',  }}><strong> {props.category}  &nbsp;</strong> </div> 
            { docsFiltered && <div style= {{ fontSize:'4vw',  }}> &nbsp;  Click an image to focus </div>}
          </div>

          <div  style={img_grid}>

            {docsFiltered && docsFiltered.map(doc => {
              const {fileName, fileType, fileUrl, category, technique, size, year, title} = doc;
              const link = '/' + doc.fileName;
              (size === undefined || year === undefined) && console.log (size,year)
              return <div key={fileName}>        
                
                {/* <Link to={link} onClick={() => props.setSelectedDoc(doc)}> choose</Link> */}
                <Link to={'/modal'}  onClick={() => props.setSelectedDoc(doc)}>
                <div className="img-wrap">
                  {(fileType === 'image/jpeg' || fileType === 'image/png') &&
                        <img src={fileUrl} alt={fileName} />}
                  {doc.fileType === 'application/pdf' && <iframe src={doc.fileUrl} title={fileName} />}
                </div>

                <div  style_={{display:'flex'}}>
                  <div style= {{color:'red', 'fontSize': fontSize(1.6) }}> ({fileName}</div>
                  <div style={{color:'magenta', 'fontSize': fontSize(1.8)}}> {title}  &nbsp;  </div>
                  <div style= {{'fontSize': fontSize(1.6) }}> ({category}, {technique})</div>
                </div>
                </Link>
              </div> 
            })}
          </div>
        </div>}
  
      </div>}

      <hr/>  
    </div>
  )
}

export default ImageGrid;
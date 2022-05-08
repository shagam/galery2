import React, {useState, useMemo} from 'react'

import { useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import GlobalFilter from './GlobalFilter'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
// import{ Styles } from './TableStyles'
import './table.css'

import CheckBox from './CheckBox'
import EditDoc from './EditDoc'
import { db } from '../firebaseConfig'
import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore"
import { getStorage, ref, deleteObject, getMetadata } from "firebase/storage"

import { IMAGE_COLUMNS } from './imageColumns'

import {nanoid} from 'nanoid';



export const ImageTable = (props) => {
 
    const [columnHideFlag, setColumnHideFlag] = useState(true);
    const [editDoc, setEditDoc] = useState();
    const [error, setError] = useState();

    const columns = useMemo(() => IMAGE_COLUMNS, []);

    const picturesRef = collection(db, props.galery);
    var  data = props.docs;
  

  function findDocFromImageName (name) {
    for (let i = 0; i < props.docs.length; i++) {
      if (props.docs[i].fileName === name)
       return props.docs[i];
    }
  }
  
  async function deleteClick(fileName) {
    const fileDoc = findDocFromImageName(fileName)
    const id = fileDoc.id;

    try{ 
      // delete doc
      var imageDoc = doc(db, props.galery, id);
      await deleteDoc (imageDoc);

      // Delete the image
      const storage = getStorage();
      const fullFileName = 'files/' + props.galery + '_' + fileDoc.fileName
      const imageRef = ref (storage, fullFileName);
      await deleteObject(imageRef);
      console.log ('delete success ', fileDoc)
        // File deleted successfully   
      props.getPictures();
      setError();
    } catch(e) {setError(e.message) && console.log(e)
    }
  }

  function editDocument (fileName) {
    const doc = findDocFromImageName(fileName)
    setEditDoc (doc);
    setError();
  }


  function chooseImage (fileName) {
    const doc = findDocFromImageName(fileName)
    props.setSelectedDoc(doc);
    setError();
  }


  const {

    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    // selectedFlatRows,
    allColumns, getToggleHideAllColumnsProps,

  } = useTable ({
    columns,
    data,
    initialState: {
      hiddenColumns: ["price", "fileUrl", "fileType", "file_kb", 'description' ]
    }

  },
  useGlobalFilter, useSortBy, useRowSelect, //useSticky, useBlockLayout, useFlexLayout, useAbsoluteLayout

  )
  
  const columnHideFlagChange = () => {setColumnHideFlag (! columnHideFlag)}


  const style_component = {
    border: '2px solid red',
  };

  const style_header = {
    // 'text-align': 'center',
    // 'background-color': '#04AA6D',
    color: 'white',
    position: 'sticky',
    top: 0
  }
    
  const column_Label_id = {
    // 'margin-right': '0px',
    // 'line-height': '0.7em'
  }
  const style_table = {
    // background: 'blue',
    // color: 'red',
    // fontSize: 200,
    overflowY: 'scroll',
    /* background: yellow; */
    textAlign: 'center',
    height: '30vh',
    display: 'block'
    // padding: '-20px',
    // margin: '-20px'
  };




  const { globalFilter } = state

  return (
    <div style= {style_component}>     

        <div>
          {error && <div className='error'>{error}</div>}
          <GlobalFilter className="stock_button_class" filter={globalFilter} setFilter={setGlobalFilter}  />
          {'  rows=' + rows.length + "  "}

           
          <CheckBox {...getToggleHideAllColumnsProps()} />   Toggle All

        <div>
          <input
            type="checkbox" checked={columnHideFlag}  
            onChange={ columnHideFlagChange}
        /> columnHide
        </div>

      {columnHideFlag && 
        <div id="columnToggle">
          {
          allColumns.map(column => (
            <div id="columnToggle_id" key={column.id}>
              <label id="column_Label_id">
                <input type='checkbox' {...column.getToggleHiddenProps()} />
                &nbsp;{column.Header}
              </label>
            </div>
          ))
          }
        </div>
      }

          <table style = {style_table} id="stockTable_id" {...getTableProps()}>
            <thead style={ style_header }>
              {headerGroups.map ((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((columns) => (
                        <th {...columns.getHeaderProps(columns.getSortByToggleProps())}>{columns.render('Header')} 
                        <span>
                          {columns.isSorted ? (columns.isSortedDesc ? <FaArrowUp color='blue'/> : <FaArrowDown color='red'/>) : ''} 
                        </span>
                        </th>
                    ))}
                  </tr>
              ))}
            </thead>
          
            <tbody id="tableBodyId" {...getTableBodyProps()}>
              {
                rows.map(row => {
                  // {style: (row.GOOGCompare > 1.1 || row.GOOGCompare < 0.9) ? {background: red}}
                  prepareRow(row)
                  return (
                    <tr id='stock_row_id_'
                      {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                        <div>
                        <button type="button" onClick={()=>chooseImage (row.values.fileName)}>choose </button>
                        {props.admin && <button type="button" onClick={()=>editDocument (row.values.fileName)}>edit </button>}
                        {props.admin && <button type="button" onClick={()=>deleteClick(row.values.fileName)}>del</button>}
                        </div>
                    </tr>
                  )
                })}
            </tbody>
          </table>

        </div>


      {editDoc && <EditDoc editDoc={editDoc} getPictures = {props.getPictures} setEditDoc={setEditDoc} galery = {props.galery}/>}

    </div>
  )
}

export default ImageTable
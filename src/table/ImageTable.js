import React, {useState, useMemo, useEffect} from 'react'

import { useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table'
import GlobalFilter from './GlobalFilter'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
// import{ Styles } from './TableStyles'
import './table.css'

import CheckBox from './CheckBox'
// import Firebase from './Firebase'
// import {db} from './firebase-config'
// import {collection, getDocs, addDoc,  doc, deleteDoc, query, where} from "firebase/firestore";
import { IMAGE_COLUMNS } from './imageColumns'
// import SPLIT_MOCK_DATA from './images.json'
import {nanoid} from 'nanoid';

export const ImageTable = (props) => {
 
    const [tableFlag, setSplitsFlag] = useState(false);
    const [columnHideFlag, setColumnHideFlag] = useState(true);

    // const [splitArray, setSplitArray] = useTable ([]);

    const columns = useMemo(() => IMAGE_COLUMNS, []);
    var  data = props.docs;// = useMemo(() => SPLIT_MOCK_DATA, []);

    // var stocksFromLocalStorage = localStorage.getItem("pictures");

    // data = useMemo(() => SPLIT_MOCK_DATA, []);


    // const imageRef = collection(db, "pictures")

    const tableFlagChange = () => {setSplitsFlag (! tableFlag)}
  
  
  function deleteClick(symbol) {
    const rowIndex = rows.findIndex((row)=> row.values.symbol === symbol);
      if (rowIndex === -1) {
        alert ('split symbol not found ', symbol);
        return;
      } 
      rows.splice(rowIndex, 1);
      saveTable();
      props.refreshCallBack(-1);
  }


  const saveTable = () => {
    const splitsTable = [];
    for (let i = 0; i < rows.length; i++) {
      splitsTable.push(rows[i].values);
    }
    const stocksStr = JSON.stringify(splitsTable);
    if (splitsTable.length > 0)
      localStorage.setItem ('splits', stocksStr);
    else
      localStorage.removeItem ('splits'); // reading empty array cause a bug
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
      hiddenColumns: ["fileUrl", "fileScanned", "fileType", "file_kb"]
    }

  },
  useGlobalFilter, useSortBy, useRowSelect, //useSticky, useBlockLayout, useFlexLayout, useAbsoluteLayout

  )
  
  //insertTableSplit(props.symbol);
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
    
  
  const style_table = {
    // background: 'blue',
    // color: 'red',
    // fontSize: 200,
    overflowY: 'scroll',
    /* background: yellow; */
    textAlign: 'center',
    height: '40vh',
    display: 'block'
    // padding: '-20px',
    // margin: '-20px'
  };

  function chooseImage (name) {
    for (let i = 0; i < props.docs.length; i++) {
      if (props.docs[i].fileName === name)
        props.setSelectedDoc(props.docs[i]);
    }

  }


  const { globalFilter } = state

  return (
  
    <div style= {style_component}>
      <div>
            <input
              type="checkbox" checked={tableFlag}
              onChange={tableFlagChange}
            /> table
      </div>

      { tableFlag &&

        <div  className = 'split'>

          <GlobalFilter className="stock_button_class" filter={globalFilter} setFilter={setGlobalFilter}  />
          {'  rows=' + rows.length + "  "}

          {/* <button type="button" onClick={()=>saveTable()}>saveTable </button>           */}
           
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
                {column.Header}
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
                        <button type="button" onClick={()=>deleteClick(row.values.fileName)}>del</button>

                        <button type="button" onClick={()=>chooseImage (row.values.fileName)}>choose </button>

                        </div>
                    </tr>
                  )
                })}
            </tbody>
          </table>


        </div>

      }     
    </div>
  )
}

export default ImageTable
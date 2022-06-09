import React, { useState } from 'react'
import CustomSelect from './CustomSelect';


export const GridSelect = (props) => {
  const [grid, setGrid] = useState(3);

  // var grid_template_columns = '1fr 1fr 1fr 1fr' + ' 1fr'
  var grid_template_columns = ' 1fr'

  
  function onChangeInput (value) {
    for (var i = 1; i < grid; i++)
    grid_template_columns += ' 1fr'
    setGrid (value.value)
    console.log (value)
  }


  var img_grid  = {
    width: '95vw',
    'background-size': 'cover',
    /* width: 130%!important; */
    /* margin: 20px auto; */
    display: 'grid',
    // 'grid-template-columns': '1fr 1fr 1fr',
    'grid-template-columns':  grid_template_columns ,
    'grid-gap': '10px'
    /* justify-content: start; */
  }

  // const GridWidth = [
  //   {label: '1', value: '1'},
  //   {label: '2', value: '2'},
  //   {label: '3', value: '3'},
  //   {label: '4', value: '4'},
  //   {label: '5', value: '5'},
  //   {label: '6', value: '6'},
  // ]
  

  return (
    <>
      <div>GridSelect</div>

      <input type="number" name = "grid" onChange={(e) => {setGrid(e.target.value)}}
          defaultValue={3} placeholder={3}></input>

      {/* <CustomSelect options={GridWidth} label='Choose category' onChange={onChangeInput } defaultValue={GridWidth[2]} /> */}
    </>

  )
}

export default GridSelect

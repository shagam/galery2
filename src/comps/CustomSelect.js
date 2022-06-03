import React from 'react'
import Select from 'react-select'


const options = [
  {label: 'Landscape', value: 'Landscape'},
  {label: 'Structure', value: 'Structure'},
  {label: 'Nature', value: 'Nature'},
  {label: 'Fabrique', value: 'Fabrique'},
  {label: 'Other', value: 'Other'},
  {label: 'all', value: 'all'},
]

const selectStyle= {
  width: '100%',
  maxWidth: 600

}

export function CustomSelect (props) {

  function onChangeInput (value) {
    console.log (value)
  }


  // console.log (label_)
  return (
    <div>
      
      {/* {label_} */}
      <h1>{props.label}</h1>
      <Select options={options} onChange={props.onChange}/>

    </div>
  )
}


export default CustomSelect;
import React, {useState} from 'react'
import MobileContext from './MobileContext';
import CustomSelect from './CustomSelect'

export const Category = (props) => {
  const [category, setCategory] = useState (props.category)

  
  const categoryList = ['Landscape', 'Buildings', 'Nature', 'Fabrique', 'Travel', 'Other', 'all'];

  function onChangeInput (value) {
    props.setCategory(value.value)
    // console.log (value)
  }
  function exec (e) {
    setCategory(e.target.value);
    props.setCategory (e.target.value);
  }
  const categoryOptions = [
    {label: 'all', value: 'all'},
    {label: 'Landscape', value: 'Landscape'},
    {label: 'Structure', value: 'Structure'},
    {label: 'Nature', value: 'Nature'},
    {label: 'Fabrique', value: 'Fabrique'},
    {label: 'Other', value: 'Other'},
  ]

  // getIndex of default category
  function searchInitialCategory (cat) {
    for (var i = 0; i < categoryOptions.length; i++) {
      if (categoryOptions[i].value === cat)
        return i;
    }
    return 0; // default is all
  }

 const { isAndroid } = MobileContext();

  var style = {};
  if (! isAndroid)
    style = {display: 'flex', color: 'red',
   zoom: '150%'}
  else
    style = {display: 'flex'}

  const oldMode = false;
  return (
    <>
      {! oldMode && <CustomSelect options={categoryOptions} label='Choose category' onChange={onChangeInput } defaultValue={categoryOptions[searchInitialCategory(props.category)]} />}

    {oldMode && <div  style={{display: 'flex'}}>
    {/* category: &nbsp;&nbsp;&nbsp; */}
    {categoryList.map((category_) => (
      <div key = {category_}  style={style} >
        <input type='radio' style={{zoom: '150%'}} name='category' value={category_} checked={category === category_} onChange={exec} /> 
        <div>{category_}&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    ))}
  </div>}
  </>
  )
}

export default Category;
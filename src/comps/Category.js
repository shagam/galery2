import React, {useState} from 'react'
import MobileContext from './MobileContext';


export const Category = (props) => {
  const [category, setCategory] = useState (props.category)

  
  const categoryList = ['landscape', 'buildings', 'trees', 'cloth', 'fruits', 'animals', 'any'];

  function exec (e) {
    setCategory(e.target.value);
    props.setCategory (e.target.value);
  }

  const { userAgentMobile, isAndroid, isIPhone} = MobileContext();

  var style = {};
  if (! isAndroid)
    style = {display: 'flex'}
  else
    style = {display: 'flex'}

// , width: '3em', hieght: '3em'
  return (
    <>

    <div  style={{display: 'flex', color: 'red'}}>
    category: &nbsp;&nbsp;&nbsp;
    {categoryList.map((category_) => (
      <div key = {category_}  style={style} >
        <input type='radio' style={{zoom: '150%'}} name='category' value={category_} checked={category === category_} onChange={exec} /> 
        <div>{category_}&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    ))}
  </div>
  </>
  )
}

export default Category;
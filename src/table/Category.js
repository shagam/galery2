import React, {useState} from 'react'

export const Category = (props) => {
  const [category, setCategory] = useState (props.category)

  
  const categoryList = ['landscape', 'buildings', 'trees', 'cloth', 'fruits', 'animals', 'any'];

  function exec (e) {
    setCategory(e.target.value);
    props.setCategory (e.target.value);
  }


  return (

    <div  style={{display: 'flex', color: 'red', zoom: '150%'}}>
    category: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {categoryList.map((category_) => (
      <div key = {category_}>
        <input type='radio' style={{zoom:'100%'}} name='category' value={category_} checked={category === category_} onChange={exec} /> 
        <label>{category_}&nbsp;&nbsp;&nbsp;</label>
      </div>
    ))}
  </div>

  )
}

export default Category;
import React, {useState} from 'react'

export const Category = (props) => {
  const [category, setCategory] = useState (props.category)

  
  const categoryList = ['landscape', 'buildings', 'trees', 'cloth', 'fruits', 'animals', 'any'];

  function exec (e) {
    setCategory(e.target.value);
    props.setCategory (e.target.value);
  }


  return (

    <div  style={{display: 'flex', color: 'red', height: '2em'}}>
    category: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {categoryList.map((category_) => (
      <>
        <input type='radio' style={{zoom:'200%'}} name='category' value={category_} checked={category === category_} onChange={exec} /> 
        {category_}&nbsp;&nbsp;&nbsp;
      </>
    ))}
  </div>

  )
}

export default Category;
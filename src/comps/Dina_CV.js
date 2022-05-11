import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Dina_CV () {

  return (
    <div>
      
      <hr/>  
      <h1> Dina Goldstein  CV </h1>
      <hr/>

      <div className='w-100 text-left mt-2'>  <Link to="/dina" > Back to Gallery </Link> </div>

      <div className='w-100 text-left mt-2'>  <Link to="/dashboard" > Dashboard </Link> </div>
    </div>

  )
}

export default Dina_CV;
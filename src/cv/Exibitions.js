import React from 'react'
import { Link } from 'react-router-dom'

import jpg from './Bezalel.jpg'

function Exibitions () {

  // const url='https://m.facebook.com/photo.php?fbid=4676135812437055&id=100001220460424&set=a.951703291547011&source=57&refid=52&__tn__=EHH-R'


  return (
    <div style={{width: '100%'}}>
      <div className='w-100 text-left mt-2'>  <Link to="/dashboard" > Dashboard </Link> </div>
      <div className='w-100 text-left mt-2'>  <Link to="/dina" > Dina Goldstein Gallery </Link> </div>
      <h2>Exibition of Dina Goldstein, in Bezalel </h2>
      <h2>Observation Patterns (Nov 2021)   </h2>
      <h3>Curator Prof. Tal Frenkel Alroy</h3>
      <img src={jpg} alt="jpg"  style={{width: '100%'}}/>
    </div>
  )

}


export default Exibitions



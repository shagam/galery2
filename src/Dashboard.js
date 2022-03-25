import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

export default function Dashboard() {
  return (
    <>

      <Card>


        <div>Dashboard</div>

        <div className='w-100 text-center mt-2'> Already have an account?  <Link to="/login" > Log In </Link> </div>

        <div className='w-100 text-center mt-2'> Need an account? <Link to="/signup" > Sign Up </Link> </div>
      </Card>
      <div className='w-100 text-center mt-2'> 
        <Button></Button>

       </div>

    </>
   )
}

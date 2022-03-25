import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'
import { updateCurrentUser } from 'firebase/auth';

import {  useAuth, logout } from './contexts/AuthContext';

export default function Dashboard() {
  const [error, setError] = useState ('');
  const { currentUser, logout } = useAuth();
  const history = useNavigate();


  async function handleLogout () {
    setError('');
    try {
      await logout();
      history.push('./login')
    } catch (e) {setError('Failed to log out') && console.log (e)}
  }

  return (
    <>

      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Profile </h2>
          {error && <Alert variant="danger"> {error} </Alert>}
          {/* <strong>Email:</strong> {currentUser.email} */}

        <div className='btn btn-primery w-100 mt-3'>  <Link to="/update-profile" variant="primeray" >   Update Profile </Link></div>
        </Card.Body>
        {/* <div>Dashboard</div> */}

        <div className='w-100 text-center mt-2'> Already have an account?  <Link to="/login" > Log In </Link> </div>

        <div className='w-100 text-center mt-2'> Need an account? <Link to="/signup" > Sign Up </Link> </div>
      </Card>
      <div className='w-100 text-center mt-2'> 
        <Button variant="link" onClick={handleLogout}>Log Out</Button>

       </div>

    </>
   )
}

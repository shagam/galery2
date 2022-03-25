import React, { useState, useRef } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthProvider, useAuth } from '../contexts/AuthContext';



export default function LOgin ()  {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, currentUser } = useAuth(); //, currentUser
  const [error, setError] = useState ('');
  const [loading, setLoading] = useState(false);
  

  async function handleSubmit (e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login (emailRef.current.value, passwordRef.current.value)
      const a = 1;
    } catch (e) {setError ('Failed to sign in' + e) && console.log (e)}
    setLoading (false);
  }


  return (

    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Log In</h2>
          {currentUser && 'email: ' + currentUser.email}
          {error && <Alert variant="danger"> {error} </Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref= {emailRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="Password" ref = {passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit"> Log in </Button>
          </Form>
        </Card.Body>
      </Card>
      
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup" > Sign Up </Link>

      </div>
    </>
  )
}

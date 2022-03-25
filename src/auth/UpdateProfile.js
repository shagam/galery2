import React, { useState, useRef } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { AuthProvider, useAuth } from '../contexts/AuthContext';


export default function UpdateProfile ()  {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser } = useAuth();
  const [error, setError] = useState ('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate([]);

  async function handleSubmit (e) {
    e.preventDefault();

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError ('Passwords do not match')
    // } 

    // if (passwordRef.current.value.length < 6) {
    //   return setError ('Passwords length need at least 6 ')
    // }

    // try {
    //   setError('');
    //   setLoading(true);
    //   await signup(emailRef.current.value, passwordRef.current.value)
    //   history.push ('/')
    //   const a = 1;
    // } catch (e) {setError ('Failed to create an account' + e) && console.log (e)}
    // setLoading (false);
  }


  return (

    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Update Profile</h2>
          {currentUser &&  currentUser.email}
          {error && <Alert variant="danger"> {error} </Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref= {emailRef} required
                  //  defaultValue={currentUser.email}
                   />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="Password" ref = {passwordRef} required 
                        placeHolder={"Leave blank to keep the same"} />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="Password" ref = {passwordConfirmRef} required 
                         placeHolder={"Leave blank to keep the same"} />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit"> Update </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account?  <Link to="/" > Cancel </Link>

      </div>
    </>
  )
}

import React, { useState, useRef } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext';
import { Container } from 'react-bootstrap'

export default function UpdateProfile ()  {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, admin, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState ('');
  const [loading, setLoading] = useState(false);
  const nvigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError ('Passwords do not match')
    } 

    if (passwordRef.current.value.length < 6) {
      return setError ('Passwords length need at least 6 ')
    }

    setError('');
    setLoading(true);
    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push (updateEmail (emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push (updatePassword (passwordRef.current.value))
    }

    Promise.all (promises).then(() => {
      nvigate('/')
    }).catch (() => {
      setError ('Failed to update account')
    }).finally (() => {
      setLoading(false)
    })
  }


  return (
    <>
      <Container  className='d-flex align-items-center justify-content-center' style={{minHeight: "50vh", width: "100%"}} > 
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Update Profile</h2>

          <div style={{display:'flex'}}>
            {currentUser && <div><strong> </strong> {currentUser.email}</div> }
            {admin && <div> &nbsp; <strong>(admin) </strong> </div>}
          </div>
          {error && <Alert variant="danger"> {error} </Alert>}
          <hr/>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref= {emailRef}
                  //  defaultValue={currentUser.email}
                   />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="Password" ref = {passwordRef}  
                        placeholder={"Leave blank to keep the same"} />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="Password" ref = {passwordConfirmRef}  
                         placeholder={"Leave blank to keep the same"} />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit"> Update </Button>
          </Form>
        </Card.Body>
      </Card>
      </Container>
      <div className='w-100 text-center mt-2'>
        Already have an account?  <Link to="/dashboard" > Cancel </Link>

      </div>

    </>
  )
}

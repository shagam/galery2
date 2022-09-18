import React, { useState, useRef } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';



export default function Login (props)  {

  const name = useRef()
  const emailRef = useRef();
  // const emailConfirmRef = useRef();
  const pictureRef = useRef();
  const commentRef = useState();

  const [error, setError] = useState ('');
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();


  async function handleSubmit (e) {
    e.preventDefault();
    // if (emailRef.current.value !== emailConfirmRef.current.value) {
    //   return setError ('Passwords do not match')
    // } 

    try {
      setError('');
      setLoading(true);
      // await login (emailRef.current.value, passwordRef.current.value)
      navigate ('/')

    } catch (e) {setError (e.message)}
    setLoading (false);
  }

  return (

    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Contact info</h2>

          {error && <Alert variant="danger"> {error} </Alert>}
          <hr/> 
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>name</Form.Label>
              <Form.Control type="text" ref= {emailRef} required />
            </Form.Group>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref= {emailRef} required />
            </Form.Group>

            {/* <Form.Group id="confirmEmail">
              <Form.Label>Confrm email</Form.Label>
              <Form.Control type="email" ref= {emailConfirmRef} required />
            </Form.Group>
 */}
            <Form.Group id="pictureName">
              <Form.Label>picture name</Form.Label>
              <Form.Control type="text" ref= {pictureRef} required />
            </Form.Group>

            <Form.Group id="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="text" ref= {commentRef} />
            </Form.Group>
            <div> 
           </div>
           <hr/>
            <Button disabled={loading} className="w-100" type="submit"> Submit </Button>
          </Form>
        </Card.Body>
      </Card>

    </>
  )
}

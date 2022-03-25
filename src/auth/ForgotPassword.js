
  import React, { useState, useRef } from 'react'
  import { Form, Button, Card, Alert } from 'react-bootstrap'
  import { Link, useNavigate } from 'react-router-dom'
  import { AuthProvider, useAuth } from '../contexts/AuthContext';
  
  
  
  export default function ForgotPassword  ()  {
    const emailRef = useRef();
  
    const { resetPassword, currentUser } = useAuth(); //, currentUser
    const [error, setError] = useState ('');
    const [ message, setMessage] = useState ()
    const [loading, setLoading] = useState(false);
    
  
    async function handleSubmit (e) {
      e.preventDefault();
  
      try {
        setError('');
        setLoading(true);
        await resetPassword (emailRef.current.value);
        setMessage ('Check your inbox for further instructions');
        // history.push ('/')
        const a = 1;
      } catch (e) {setError ('Failed to reset passwrd' + e) && console.log (e)}
      setLoading (false);
    }
  
  
    return (
  
      <>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'> Password Reset</h2>
            {currentUser && 'email: ' + currentUser.email}
            {error && <Alert variant="danger"> {error} </Alert>}
            {error && <Alert variant="success"> {message} </Alert>}
  
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref= {emailRef} required />
              </Form.Group>
  
              <Button disabled={loading} className="w-100" type="submit"> Reset password </Button>
            </Form>
            <div className='w-100 text-center mt-3'>   <Link to="/login" >
               Login </Link> 
            </div>
          </Card.Body>
        </Card>
  
        <div className='w-100 text-center mt-2'>
          Need an account? <Link to="/signup" > Sign Up </Link>
  
        </div>
      </>
    )
  }
  
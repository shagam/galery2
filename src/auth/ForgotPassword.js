
  import React, { useState, useRef } from 'react'
  // import { sendPasswordResetEmail } from 'firebase/auth';

  import { Form, Button, Card, Alert } from 'react-bootstrap'
  import { Link} from 'react-router-dom'
  import { useAuth } from '../contexts/AuthContext';
  // import { db, app, projectStorage, auth } from '../firebaseConfig'    
  import { Container } from 'react-bootstrap'

  export default function ForgotPassword  ()  {
    const emailRef = useRef();
  
    const { resetPassword, currentUser } = useAuth(); //, currentUser
    const [error, setError] = useState ('');
    const [ message, setMessage] = useState ()
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
  
    async function handleSubmit (e) {
      e.preventDefault();
  
      try {
        setError('');
        setLoading(true);
        // await sendPasswordResetEmail(emailRef.current.value)
        await resetPassword (emailRef.current.value);
        setMessage ('Check your inbox for further instructions');
        // navigate ('/')

      } catch (e) {setError ('Failed to reset passwrd' + e.message) && console.log (e)}
      setLoading (false);
    }
  
  
    return (
  
      <>
        <Container  className='d-flex align-items-center justify-content-center' style={{minHeight: "50vh", width: "100%"}} > 
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'> Password Reset</h2>
            {currentUser && <div><strong> </strong> {currentUser.email}</div> }
            <hr/>   
            {error && <Alert variant="danger"> {error} </Alert>}
            {message && <Alert variant="success"> {message} </Alert>}
  
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref= {emailRef} required />
              </Form.Group>
              <hr/>
              <Button disabled={loading} className="w-100" type="submit"> Reset password </Button>
            </Form>
            <div className='w-100 text-center mt-3'>   <Link to="/login" >
               Login </Link> 
            </div>
          </Card.Body>
        </Card>
        </Container>
        <div className='w-100 text-center mt-2'>
          Need an account? <Link to="/signup" > Sign Up </Link>
  
        </div>
        <div className='w-100 text-center mt-2'>  <Link to="/dashboard" > Dashboard </Link> </div>
      </>
    )
  }
  
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import FeedbackForm from './src/FeedbackForm';
import AdminPanel from './src/AdminPanel';


function Admin() {
  const navigate=useNavigate();
    return (
      <>
      
      <Container style={{ maxWidth: '800px', marginTop: '2rem' }}>
      <h1 className="text-center">Welcome to admin page</h1><br></br>
      <div className=''>
      <NavLink to="/feedbackform"><Button class variant="primary" className='m-4 text-white' onClick=           {<FeedbackForm/>}>Add Feedback</Button></NavLink>
      
      <NavLink to="/adminpanel"><Button variant="primary" className='m-4' onClick={<AdminPanel/>}>All Feedback</Button></NavLink>
      </div>
      </Container>
      </>
    );
  }
  
  export default Admin;
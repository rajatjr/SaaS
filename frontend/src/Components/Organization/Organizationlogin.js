import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Form, FormControl, InputGroup } from 'react-bootstrap';


const Organizationlogin = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate('/');
      toast.success('Logout Successfully!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3451/organizationlogin', formData);
      console.log(response);
      if (response.data.success === true) {
        localStorage.setItem('tokenOrg', response.data.token);
        navigate('/homeorganization');
        toast.success('Login Successful', { position: 'top-center' });
      } else {
        toast.error(response.data.msg, { position: 'top-center' });
      }
    } catch (error) {
      toast.error('An error occurred', { position: 'top-center' });
    }
  };

  return (
    <Container style={{width:"50%",height:"50%", marginTop: '75px' }}>
      <h2 style={{color:"#2596be"}}>Login for Organization</h2>
      
      <Form onSubmit={handleSubmit}>
       
        <Form.Group>
          Email
          <InputGroup>
            <FormControl
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        <br/>

        <Form.Group>
          Password
          <InputGroup>
            <FormControl
              type="password"
              textAlign= "center"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <br/>
        <Button type="submit">Login</Button><br/><br/>
{/* <Button variant="primary" onClick={handleLogout}>Logout</Button> */}
</Form>
      <p>
        Don't have an account? <Link to="/OrganizationSignUp">Signup</Link>
      </p>
      <ToastContainer />
    </Container>
  );
};

export default Organizationlogin;

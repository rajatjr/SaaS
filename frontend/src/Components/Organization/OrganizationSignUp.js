import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap'; 
import './OrganizationSignUp.css';


const OrganizationSignUp = () => {
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

  const [data, setData] = useState([]);
  const [planid, setPlanid] = useState();

  const handleSubsId = (id) => {
    console.log('plan id id', id);
    setPlanid(id);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log('this is plan id before formdata', planid);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3451/createOrganization', {
        formData,
        planid,
      });
      if (response.data.success) {
        navigate('/Organizationlogin');
        toast.success('Signup Successful', { position: 'top-center' });
      } else {
        toast.error(response.data.msg, { position: 'top-center' });
      }
    } catch (error) {
      toast.error('An error occurred', { position: 'top-center' });
    }
  };

  const getAllPlans = async () => {
    const res = await axios.get('http://localhost:3451/getSubscription');
    setData(res.data.subscription);
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  return (
    
    <Container className="mt-5"  style={{width:"50%",height:"50%"}}>
      <h2 className="text-center" style={{color:"#2596be"}}>Signup for Organization</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          Name
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange} 
          />
        </Form.Group>
        <br/>
        <Form.Group>
          Email
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <br/>
        <Form.Group>
          Password
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <br/>
        <Form.Group>
        Confirm Password
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>
        <br/>
        <Form.Group className="d-flex justify-content-center">
          <Form.Control
            as="select"
            onChange={(e) => handleSubsId(e.target.value)}
            className="w-50"
          >
            <option>Select plan</option>
            {data.length > 0 &&
              data.map(function (item) {
                return (
                  <option key={item._id} value={item._id}>
                    {item.name}...{item.price}
                  </option>
                );
              })}
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-between">
  {/* <Button type="submit" className="mr-1">
    Signup
  </Button> */}

  {/* <Button variant="primary" onClick={handleLogout} className="ml-1">
    Logout
  </Button> */}
</div>
<br/>
<Button type="submit" className="mr-1">
    Signup
  </Button>

      </Form>
      <br/>
      {/* <Button variant="primary" onClick={handleLogout} className="ml-1">
    Logout
  </Button> */}

      <p className="text-center mt-3">
        Already have an account? <Link to="/Organizationlogin">Login</Link>
      </p>
      <ToastContainer />
    </Container>
  );
};

export default OrganizationSignUp;

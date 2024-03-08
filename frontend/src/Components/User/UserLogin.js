import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:3451/userlogin', values);
      if (response.data.success) {
        // Store user token or other data in localStorage if needed
        const userToken = response.data.token;
        localStorage.setItem('userToken', userToken);
        
        // Decode user token to get user info if needed
        const user = jwtDecode(userToken);
        console.log('User info:', user);

        // Redirect to a protected route or user dashboard
        navigate('/userDashboard');

        toast.success('Login Successful', { position: 'top-center' });
      } else {
        toast.error(response.data.msg, { position: 'top-center' });
      }
    } catch (error) {
      toast.error('An error occurred', { position: 'top-center' });
    }
  };

  return (
    <div className="container" style={{width:"50%",height:"50%", marginTop: '100px' }}>
      <h2 style={{color:"#2596be"}}>User Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{color:"#2596be"}}>Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"style={{color:"#2596be"}}>Password</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserLogin;

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

const UserSignupForm = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("tokenOrg")
  console.log("token from from organizationb", token)
  const decode = jwtDecode(token)
  console.log("organizaton decode:", decode.id)
  const id = decode.id
  const initialValues = {
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    organizationId: id
  };


  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    phonenumber: Yup.string().required('Phone Number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values)
      const response = await axios.post('http://localhost:3451/usersignup', values);
      if (response.data.success) {
        navigate("/HomeOrganization")
        toast.success('Signup Successful', { position: 'top-center' });
        resetForm();
      } else {
        toast.error(response.data.msg, { position: 'top-center' });
      }
    } catch (error) {
      toast.error('An error occurred', { position: 'top-center' });
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>

          <div className="mb-3">
            <label htmlFor="firstname" className="form-label"> First Name </label>
            <Field type="text" name="firstname" className="form-control" />
            <ErrorMessage name="firstname" component="div" className="error" />
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label"> Last Name </label>
            <Field type="text" name="lastname" className="form-control" />
            <ErrorMessage name="lastname" component="div" className="error" />
          </div>


          <div className="mb-3">
            <label htmlFor="phonenumber" className="form-label"> Phone Number </label>
            <Field type="phonenumber" name="phonenumber" className="form-control" />
            <ErrorMessage name="phonenumber" component="div" className="error" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label"> Email </label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <Field type="address" name="address" className="form-control" />
            <ErrorMessage name="address" component="div" className="error" />
          </div>


          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <Field type="password" name="confirmPassword" className="form-control" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>

          <button type="submit" className="btn btn-primary">Signup</button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserSignupForm;

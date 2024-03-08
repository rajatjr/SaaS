import React from 'react';
import './Signup.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const AdminSignup = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {

            const res = await axios.post('http://localhost:5000/sign-up', values);
            console.log("response from the sign up api ", res)
            navigate('/login')
            if (res.data.success === true) {
                toast.success('Sign up Successfully!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            } else {
                toast.error('Wrong credentials entered.', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            }

        }

        catch (error) {
            // Handle error
        }
    };

    // login Button

    const handleLoginClick = () => {
        navigate('/adminlogin');
    };


    return (
        <div className="signup-container">
             <Navbar />
            <div className="background-image"></div>

            <Container className="signup-form-container">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h2>SignUp</h2>
                        <Formik
                            initialValues={{
                                // name: '',
                                email: '',
                                password: '',
                                // confirmPassword: '',
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={handleSubmit}
                        >

                            <Form className='input'>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">


                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"

                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">

                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                

                                <Button variant="primary" type="submit">
                                    Sign Up
                                </Button>

                                {<div style={{ marginTop: '15px' }}></div>}
                                <p>Already have an account ?</p>
                                <Button variant="primary" onClick={handleLoginClick}>
                                    Login
                                </Button>

                            </Form>
                        </Formik>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </div>

    );
};

export default AdminSignup;

















































// import React, { useState } from 'react'
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';


// const Singup = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setconfirmPassword] = useState('');
//     const [msg, setMsg] = useState('');
//     const navigate = useNavigate();

//     const Singup = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/sign-up', {
//                 name: name,
//                 email: email,
//                 password: password,
//                 confirmPassword: confirmPassword
//             });

//             navigate("/")

//         } catch (error) {
//             if (error.response) {
//                 setMsg(error.response.data.msg);
//             }
//         }
//     }


//     return(
//         d
//     )
// }
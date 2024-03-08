// import React from 'react';
// import './Login.css';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Button, Container, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import Navbar from '../Navbar';


// const LoginSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string().required('Password is required'),
// });

// const AdminLogin = () => {
    
//     const navigate = useNavigate();

//     const handleSubmit = async (values) => {
//         try {
//             const res = await axios.post('http://localhost:3451/adminlogin', {
//                 email: values.email,
//                 password: values.password,
//             });

//             if (res.data.success === true) {
//                 localStorage.setItem('isLoggedIn', true);
//                 localStorage.setItem('token', res.data.token);
//                 navigate('/adminhome');
//                 toast.success(res.data.msg, {
//                     position: 'top-center',
//                     autoClose: 4000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: 'colored',
//                 });
                
//             } else {
//                 toast.error(res.data.msg, {
//                     position: 'top-center',
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: 'colored',
                    
//                 });
//             }
            
//         } catch (error) {
//             if (error.response) {

//             }
//         }
//     };

//     return (

//         <div className="login-container">
            
//             <div className="login-background-image" ></div>

//             <Container className="login-form-container" style={{width:"50%",height:"50%" }}>
//             <Navbar />
//                 <Row className="justify-content-center">
//                     <Col md={6}>
//                         <h2 style={{ color: 'red' }}>Admin Login</h2>
//                         <Formik
//                             initialValues={{
//                                 email: '',
//                                 password: '',
//                             }}
//                             validationSchema={LoginSchema}
//                             onSubmit={handleSubmit}
//                         >
//                             <Form className='input'>

//                                 <div className="mb-4">
//                                     <label htmlFor="email" className="form-label">

//                                     </label>
//                                     <Field
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         className="form-control"
//                                         placeholder="Email"
//                                     />
//                                     <ErrorMessage
//                                         name="email"
//                                         component="div"
//                                         className="text-danger"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="password" className="form-label">

//                                     </label>
//                                     <Field
//                                         type="password"
//                                         id="password"
//                                         name="password"
//                                         className="form-control"
//                                         placeholder="Password"
//                                     />
//                                     <ErrorMessage
//                                         name="password"
//                                         component="div"
//                                         className="text-danger"
//                                     />
//                                 </div>
                               
//                                 <Button variant="primary" type="submit" >
//                                     Admin Login
//                                 </Button>

//                             </Form>
//                         </Formik>
//                     </Col>
//                 </Row>
//                 <ToastContainer />
//             </Container>
            
//         </div>
//     );
// };
// export default AdminLogin;



import React from 'react';
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '../Navbar';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post('http://localhost:3451/adminlogin', {
        email: values.email,
        password: values.password,
      });

      if (res.data.success === true) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('token', res.data.token);
        navigate('/adminhome');
        toast.success(res.data.msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        toast.error(res.data.msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-background-image"></div>
      <Container className="login-form-container" style={{ width: '50%', height: '50%' }}>
        <Navbar />
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 style={{ color: 'red' }}> Admin Login </h2>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              <Form className="input">
                <div className="mb-4">
                  <label htmlFor="email" className="form-label"></label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label"></label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <Button variant="primary" type="submit">
                  Admin Login
                </Button>
              </Form>
            </Formik>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default AdminLogin;

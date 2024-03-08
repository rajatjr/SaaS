import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faCheckCircle,
  faDeleteLeft,
} from '@fortawesome/free-solid-svg-icons';

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [Organization, setOrganization] = useState([]);
  const[plan ,setPlan]=useState()
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate('/');
      toast.success('Logout Successfully!', {
        position: 'top-center',
        autoClose: 3000,
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

  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:3451/getalluser');
      setData(res.data.getallUser);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getorganization = async () => {
    try {
      const res = await axios.get('http://localhost:3451/getAllOrganizations');
      setPlan(res.data.name)
      setOrganization(res.data.organizations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getorganization();
  }, []);

  const deleteUser = async (_id) => {
    try {
      const res = await axios.delete(`http://localhost:3451/deleteuser/${_id}`);
      setData((prevUsers) => prevUsers.filter((user) => user._id !== _id));
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
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrganization = async (_id) => {
    try {
      const res = await axios.delete(`http://localhost:3451/deleteOrganizationById/${_id}`);
      setData((prevUsers) => prevUsers.filter((user) => user._id !== _id));
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
      getorganization();
    } catch (error) {
      console.error(error);
    }
  };

  const UserStatus = async (_id, isActive) => {
    try {
      const res = await axios.patch(`http://localhost:3451/updateactive/${_id}`, { isActive });
      setData((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === _id) {
            return { ...user, isActive };
          }
          return user;
        })
      );
      toast.success(res.data.msg, {
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
      console.error(error);
    }
  };

  return (
    <div className="admin-home-background">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>

      <div className="center-content">
        <Container className="mt-5" >
          <h2 style={{color:"red"}}>Welcome</h2>
        </Container>
        <br />

        <h3 style={{color:"#2596be"}}> Users Details (SELLER)</h3>

        <div style={{ width: '90%', display: 'flex', alignItems: 'center', margin: '0 auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ background: '#f2f2f2', color: '#2596be' }}>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  <FontAwesomeIcon icon={faUser} /> User Name
                </th>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                </th>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  <FontAwesomeIcon icon={faCheckCircle} /> Status
                </th>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  <FontAwesomeIcon icon={faDeleteLeft} /> Delete User
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(function (item) {
                return (
                  <tr key={item.id} style={{ border: '1px solid #ddd' }}>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        color: item.isActive ? 'green' : 'red',
                      }}
                    >
                      {item.firstname}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        color: item.isActive ? 'green' : 'red',
                      }}
                    >
                      {item.email}
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <select
                        value={item.isActive ? 'Active' : 'Deactive'}
                        onChange={(e) => {
                          const isActive = e.target.value === 'Active';
                          UserStatus(item._id, isActive);
                        }}
                      >
                        <option value="Active">Active</option>
                        <option value="Deactive">Deactive</option>
                      </select>
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <button
                        onClick={() => deleteUser(item._id)}
                        style={{
                          color: 'white',
                          background: 'red',
                          padding: '6px 12px',
                          borderRadius: '25px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                          transition: 'background 0.3s ease',
                        }}
                      >
                        Delete User
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <h3 style={{color:"#2596be"}}>Organization Details</h3>
        <div style={{ width: '90%',display: 'flex', alignItems: 'center', margin: '0 auto'  }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ background: '#f2f2f2', color: '#2596be' }}>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  <FontAwesomeIcon icon={faUser} /> Organization Name
                </th>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                </th>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  <FontAwesomeIcon icon={faCheckCircle} /> Subscription Plan
                </th>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  <FontAwesomeIcon icon={faDeleteLeft} /> Delete Organization
                </th>
              </tr>
            </thead>
            <tbody>
              {Organization.map(function (item) {
                console.log("res item",item.subscriptionId.name)
                return (
                  <tr key={item.id} style={{ border: '1px solid #ddd' }}>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        color: item.isActive ? 'green' : 'red',
                      }}
                    >
                      {item?.name}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        color: item.isActive ? 'green' : 'red',
                      }}
                    >
                      {item?.email}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        color: item.isActive ? 'green' : 'red',
                      }}
                    >
                      {item.subscriptionId.name}
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <button
                        onClick={() => deleteOrganization(item._id)}
                        style={{
                          color: 'white',
                          background: 'red',
                          padding: '6px 12px',
                          borderRadius: '25px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                          transition: 'background 0.3s ease',
                        }}
                      >
                        Delete Organization
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

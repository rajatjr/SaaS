import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_Decode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faDollar, faCheckCircle, faTasks, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

const HomeOrganization = () => {
    const token = localStorage.getItem("tokenOrg");

    const [data, setData] = useState([]);
    const [plan, setPlan] = useState()
    const [price, setPrice] = useState()
    console.log("token", token);
    const navigate = useNavigate();
    const decode = jwt_Decode(token);
    console.log("decoded token,", decode.id)
    const orgId = decode.id

    const handleLogout = async () => {
        try {
            localStorage.clear();
            navigate("/");
            toast.success(' Logout Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.log(error);
        }
    };


    const getUser = async () => {
        const res = await axios.get(`http://localhost:3451/getuser?orgId=${orgId}`);
        console.log(res)
        setData(res.data.getuser);
        setPlan(res.data.plan);
        setPrice(res.data.price)
    };

    useEffect(() => {
        getUser();
    }, []);


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
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.error(error);
        }
    };


    // deteteuser   

    const deleteUser = async (_id) => {
        try {
            const res = await axios.delete(`http://localhost:3451/deleteuser/${_id}`);

            setData((prevUsers) => prevUsers.filter((user) => user._id !== _id));
            toast.success(res.data.msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.error(error);
        }
    };



    return (

        <>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container >
                        <Navbar.Brand style={{ color: "#2596be" }}>Organization Dashboard</Navbar.Brand>
                        <Navbar.Brand style={{ color: "#2596be" }}>Organization Plan : {plan}</Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/usersignup">Add User</Nav.Link>
                            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                        </Nav>
                    </Container>
                </Navbar>
            </div>


            <div style={{
                backgroundImage: `url(${''})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>


                <Container className="mt-5">

                    <h2 style={{ color: "#2596be" }}>Welcome to the Organization Dashboard</h2>
                </Container>
                <br />
                <div style={{ width: '50%' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>

                        <thead>
                            <tr style={{ background: '#f2f2f2', color: "#2596be" }}>

                                <th style={{ border: '1px solid black', padding: '8px' }}><FontAwesomeIcon icon={faUser} /> User Name</th>

                                <th style={{ border: '1px solid black', padding: '8px' }}>
                                    <FontAwesomeIcon icon={faEnvelope} /> Email</th>

                                <th style={{ border: '1px solid black', padding: '8px' }}><FontAwesomeIcon icon={faCheckCircle} /> Status </th>

                                <th style={{ border: '1px solid black', padding: '8px' }}><FontAwesomeIcon icon={faTasks} /> Plan  </th>


                                <th style={{ border: '1px solid black', padding: '8px' }}><FontAwesomeIcon icon={faDollar} /> Price  </th>

                                <th style={{ border: '1px solid black', padding: '8px' }}><FontAwesomeIcon icon={faDeleteLeft} /> Delete User  </th>

                            </tr>
                        </thead>

                        <tbody>
                            {data.map(function (item) {
                                console.log("item", item);
                                return (
                                    <tr key={item.id} style={{ border: '1px solid #ddd' }}>
                                        <td
                                            style={{
                                                border: '1px solid black',
                                                padding: '8px',
                                                color: item.isActive ? 'green' : 'red'
                                            }}
                                        >
                                            {item.firstname}
                                        </td>

                                        <td
                                            style={{
                                                border: '1px solid black',
                                                padding: '8px',
                                                color: item.isActive ? 'green' : 'red'
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

                                        <td
                                            style={{
                                                border: '1px solid black',
                                                padding: '8px',
                                                color: "#2596be"

                                            }}
                                        >
                                            {plan}
                                        </td>


                                        <td style={{ border: '1px solid black', padding: '8px', color: "#2596be" }}> {price}</td>


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
            </div>
        </>
    );
};

export default HomeOrganization;

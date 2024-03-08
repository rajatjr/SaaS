import React from 'react';
import { Button, Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (

    <BootstrapNavbar expand="lg" >

      <Container className="mx-auto">
        <BootstrapNavbar.Brand style={{ color: 'red' }}> SAAS </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mx-2">
              <Button as={Link} to="/OrganizationSignUp" variant="outline-primary" style={{ color: 'red' }}>
                Organization Signup
              </Button>
            </li>
            <li className="nav-item mx-2">
              <Button as={Link} to="/OrganizationLogin" variant="outline-primary" style={{ color: 'red' }}>
                Organization Login
              </Button>
            </li>
            <li className="nav-item mx-2">
              <Button as={Link} to="/userlogin" variant="outline-primary" style={{ color: 'red' }}>
                User Login
              </Button>
            </li>
          </ul>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <Nav className="flex-column">
      <Nav.Link as={Link} to="/userlogin">User login</Nav.Link>
    
    </Nav>
  );
};

export default AdminSidebar;

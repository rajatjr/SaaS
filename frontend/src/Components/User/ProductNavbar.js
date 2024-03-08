import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import image from '../User/rajatlogo.png';
import '../../Components/Signup.css';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// Import FontAwesome animation classes
import { faSpinner, faCircle } from '@fortawesome/free-solid-svg-icons';

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
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

    localStorage.removeItem('userToken');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={image}
            alt="Logo"
            width="100"
            height="40"
            style={{ marginTop: '' }}
          />
        </a>
        <div className="navbar-collapse">
          <ul className="navbar-nav ml-auto align-items-center">
            <li className="nav1"></li>
            <li className="nav-item me-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </li>

            <li className="nav-item me-2" style={{ marginLeft: '10px' }}>
              {/* Add some margin to create a gap */}
              <Button variant="danger" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


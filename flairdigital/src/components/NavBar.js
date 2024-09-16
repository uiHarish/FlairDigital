import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css'; 
import logo from '../assets/logo.png'; 
// import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import 'primeicons/primeicons.css';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 
  const profileRef = useRef(null); 

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className='logoStyles'/> 
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="navbar-icons">
        <div className="navbar-icon" onClick={toggleDropdown} ref={profileRef}>
          {/* <PermIdentityIcon fontSize="large"/> */}
          <i className="pi pi-user" style={{ fontSize: '2rem' }}></i>
          {isDropdownOpen && (
            <div className="dropdown-menu" ref={dropdownRef}>
              <a href="/account" className="dropdown-item">Your Account</a>
              <a href="/logout" className="dropdown-item">Log Out</a>
            </div>
          )}
        </div>
        <a href="/cart" className="navbar-icon"><i className="pi pi-shopping-cart" style={{ fontSize: '2rem' }}></i></a>
      </div>
    </nav>
  );
};

export default Navbar;

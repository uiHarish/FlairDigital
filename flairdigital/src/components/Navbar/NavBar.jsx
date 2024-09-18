import React, { useState, useEffect, useRef } from 'react';
import './NavBar.scss'; 
import fdLogo from '../../assets/fdLogo.png'; 
import 'primeicons/primeicons.css';

const Navbar = ({ cart }) => {
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
        <img src={fdLogo} alt="Logo" className='logoStyles'/> 
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="navbar-icons">
        <div className="navbar-icon" onClick={toggleDropdown} ref={profileRef}>
          <i className="pi pi-user" style={{ fontSize: '2rem' }}></i>
          {isDropdownOpen && (
            <div className="dropdown-menu" ref={dropdownRef}>
              <a href="/account" className="dropdown-item">Your Account</a>
              <a href="/logout" className="dropdown-item">Log Out</a>
            </div>
          )}
        </div>
        <a href="/cart" className="navbar-icon">
          <i className="pi pi-shopping-cart" style={{ fontSize: '2rem' }}></i>
          {cart.length > 0 && <span>({cart.length})</span>}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import './MenuBar.scss'; 
// import MenuIcon from '@mui/icons-material/Menu';
import 'primeicons/primeicons.css';

const MenuBar = () => {
  return (
    <div className="menu-bar">
    <i className="pi pi-bars" style={{ fontSize: '1.8rem' }}></i>
      <a href="/all" className="menu-item">ALL</a>
      <a href="/mobiles" className="menu-item">Mobiles</a>
      <a href="/laptops" className="menu-item">Laptops</a>
      <a href="/home-appliances" className="menu-item">Home Appliances</a>
      <a href="/accessories" className="menu-item">Accessories</a>
    </div>
  );
};

export default MenuBar;

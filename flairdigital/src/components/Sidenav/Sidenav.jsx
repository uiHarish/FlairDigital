import React, { useState } from "react";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider"; 
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';                 
import 'primeicons/primeicons.css';                                
import './Sidenav.scss';

const Sidenav = ({ onPriceRangeChange }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 100000]); 

    const brandOptions = [
        'Samsung', 'Apple', 'Vivo', 'Oppo', 'Mi'
    ];

    const settingsOptions = [
        'Profile Settings',
        'Account Settings'
    ];

    const handleDropdownToggle = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const handleSliderChange = (values) => {
        setPriceRange(values);
        const rangeString = `${values[0]} - ${values[1]}`; 
        onPriceRangeChange(rangeString); 
    };

    return (
        <div className="sidenav">
            <Button 
                icon="pi pi-home" 
                label="Home" 
                className="p-button-text" 
                onClick={() => setActiveDropdown(null)} 
            />

            <Button 
                icon="pi pi-filter" 
                label="Filter" 
                className="p-button-text"
                onClick={() => handleDropdownToggle('filter')} 
            />
            {activeDropdown === 'filter' && (
                <div className="dropdown-container">
                    <div className="slider-container">
                        <Slider
                            value={priceRange}
                            onChange={(e) => handleSliderChange(e.value)}
                            range
                            min={0}
                            max={100000}
                            step={1000}
                        />
                        <div className="slider-labels">
                            <span>{priceRange[0]}</span>
                            <span>{priceRange[1]}</span>
                        </div>
                    </div>
                </div>
            )}

            <Button 
                icon="pi pi-plus" 
                label="Brand" 
                className="p-button-text"
                onClick={() => handleDropdownToggle('brand')}
            />
            {activeDropdown === 'brand' && (
                <div className="dropdown-container">
                    {brandOptions.map((brand, index) => (
                        <div 
                            key={index} 
                            className="filter-option"
                        >
                            {brand}
                        </div>
                    ))}
                </div>
            )}

            <Button 
                icon="pi pi-cog" 
                label="Settings" 
                className="p-button-text" 
                onClick={() => handleDropdownToggle('settings')}
            />
            {activeDropdown === 'settings' && (
                <div className="dropdown-container">
                    {settingsOptions.map((setting, index) => (
                        <div 
                            key={index} 
                            className="filter-option"
                        >
                            {setting}
                        </div>
                    ))}
                </div>
            )}

            <Button 
                icon="pi pi-address-book" 
                label="Contact" 
                className="p-button-text" 
                onClick={() => setActiveDropdown(null)} 
            />
            <Button 
                icon="pi pi-at" 
                label="Support" 
                className="p-button-text" 
                onClick={() => setActiveDropdown(null)} 
            />
            <Button 
                icon="pi pi-wallet" 
                label="Wallet" 
                className="p-button-text" 
                onClick={() => setActiveDropdown(null)} 
            />
        </div>
    );
};

export default Sidenav;

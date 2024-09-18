import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';                 
import 'primeicons/primeicons.css';                                
import './Sidenav.css';

const Sidenav = () => {
    const [visible, setVisible] = useState(false);
    const [isFilterClicked, setIsFilterClicked] = useState(false);
    const [isBrandClicked, setIsBrandClicked] = useState(false);

    // Range options as an array
    const rangeOptions = [
        '0 - 10,000',
        '10,001 - 20,000',
        '20,001 - 30,000',
        '30,001 - 50,000',
        '50,001 - 100,000'
    ];

    // Brand options as an array
    const brandOptions = [
        'Samsung', 'Apple', 'Vivo', 'Oppo', 'Mi'
    ];

    // Handle range selection and hide options
    const handleRangeSelect = (range) => {
        console.log('Selected range:', range);
        setIsFilterClicked(false); // Hide range options after selection
    };

    // Handle brand selection and hide options
    const handleBrandSelect = (brand) => {
        console.log('Selected brand:', brand);
        setIsBrandClicked(false); // Hide brand options after selection
    };

    // Handle sidebar close, reset dropdown visibility
    const handleSidebarHide = () => {
        setVisible(false);
        setIsFilterClicked(false); // Close filter dropdown
        setIsBrandClicked(false); // Close brand dropdown
    };

    return (
        <div>
            {/* Main button to toggle sidebar */}
            <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
            
            {/* Sidebar component */}
            <Sidebar visible={visible} onHide={handleSidebarHide}>
                <h3>Menu</h3>
                <Button icon="pi pi-home" label="Home" className="p-button-text" />
                
                {/* Filter Button to trigger dropdown */}
                <Button 
                    icon="pi pi-filter" 
                    label="Filter" 
                    className="p-button-text"
                    onClick={() => setIsFilterClicked(!isFilterClicked)} 
                />

                {/* Conditionally render the range options dynamically */}
                {isFilterClicked && (
                    <div className="dropdown-container">
                        {rangeOptions.map((range, index) => (
                            <Button 
                                key={index} 
                                label={range} 
                                className="p-button-text dynamic-option" 
                                onClick={() => handleRangeSelect(range)} 
                            />
                        ))}
                    </div>
                )}

                {/* Brand Button to trigger dropdown */}
                <Button 
                    icon="pi pi-plus" 
                    label="Brand" 
                    className="p-button-text"
                    onClick={() => setIsBrandClicked(!isBrandClicked)}
                />

                {/* Conditionally render the brand options dynamically */}
                {isBrandClicked && (
                    <div className="dropdown-container">
                        {brandOptions.map((brand, index) => (
                            <Button 
                                key={index} 
                                label={brand} 
                                className="p-button-text dynamic-option" 
                                onClick={() => handleBrandSelect(brand)} 
                            />
                        ))}
                    </div>
                )}

                <Button icon="pi pi-address-book" label="Contact" className="p-button-text" />
                <Button icon="pi pi-at" label="Support" className="p-button-text" />
                <Button icon="pi pi-wallet" label="Wallet" className="p-button-text" />
            </Sidebar>
        </div>
    );
};

export default Sidenav;

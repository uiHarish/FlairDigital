import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import './AddProduct.scss'; 

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productMrp, setProductMrp] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [productDiscountPrice, setProductDiscountPrice] = useState('');
    const [productVariant, setProductVariant] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState('');

    const categories = [
        { label: 'Mobile', value: 'Mobile' },
        { label: 'Laptop', value: 'Laptop' },
        { label: 'Home Appliances', value: 'Home Appliances' },
        { label: 'Electronics', value: 'Electronics' },
    ];

    const brands = [
        { label: 'Samsung', value: 'Samsung' },
        { label: 'Apple', value: 'Apple' },
        { label: 'LG', value: 'LG' },
        { label: 'Sony', value: 'Sony' },
    ];

    const variants = [
        { label: '128GB', value: '128GB' },
        { label: '256GB', value: '256GB' },
        { label: '512GB', value: '512GB' },
    ];

    const discountOptions = [
        { label: '10%', value: 10 },
        { label: '20%', value: 20 },
        { label: '30%', value: 30 },
    ];

    const stockOptions = [
        { label: 'In-Stock', value: 'In-Stock' },
        { label: 'Stock-out', value: 'Stock-out' },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();  
        console.log({
            productName,
            productCategory,
            productBrand,
            productMrp,
            discountPercent,
            productDiscountPrice,
            productVariant,
            productStock,
            productDescription,
            productImage
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-wrapper p-fluid">
                <h1>Add Product</h1>
                <div className="p-field">
                    <label htmlFor="productName">Product Name:</label>
                    <InputText
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="productCategory">Product Category:</label>
                    <Dropdown
                        id="productCategory"
                        value={productCategory}
                        options={categories}
                        onChange={(e) => setProductCategory(e.value)}
                        placeholder="Select category"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="productBrand">Product Brand:</label>
                    <Dropdown
                        id="productBrand"
                        value={productBrand}
                        options={brands}
                        onChange={(e) => setProductBrand(e.value)}
                        placeholder="Select brand"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="productMrp">MRP (Price):</label>
                    <InputText
                        id="productMrp"
                        value={productMrp}
                        onChange={(e) => setProductMrp(e.target.value)}
                        placeholder="Enter MRP"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="discountPercent">Discount Percentage:</label>
                    <Dropdown
                        id="discountPercent"
                        value={discountPercent}
                        options={discountOptions}
                        onChange={(e) => setDiscountPercent(e.value)}
                        placeholder="Select discount"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="productDiscountPrice">Discount Price:</label>
                    <InputText
                        id="productDiscountPrice"
                        value={productDiscountPrice}
                        onChange={(e) => setProductDiscountPrice(e.target.value)}
                        placeholder="Enter discount price"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="productVariant">Product Variant Type:</label>
                    <Dropdown
                        id="productVariant"
                        value={productVariant}
                        options={variants}
                        onChange={(e) => setProductVariant(e.value)}
                        placeholder="Select variant"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="productStock">Stock Quantity:</label>
                    <Dropdown
                        id="productStock"
                        value={productStock}
                        options={stockOptions}
                        onChange={(e) => setProductStock(e.value)}
                        placeholder="Select quantity"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="productImage">Product Image/File:</label>
                    <FileUpload
                        id="productImage"
                        customUpload
                        mode="basic"
                        accept="image/*"
                        auto
                        onSelect={(e) => setProductImage(e.files[0])}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="productDescription">Product Description:</label>
                    <InputTextarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        rows={5}
                        placeholder="Enter product description"
                    />
                </div>

                <Button type="submit" label="Submit" />
            </form>
        </div>
    );
}

export default AddProduct;

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import '../style/Form.css';


export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [productImage, setProductImage] = useState('');
  const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();
  const productNameRef = useRef(null);

  // Fetch Id from localStorage once component mounts
  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      setAdminId(id);
    } else {
      alert('Admin not logged in. Please log in first.');
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    if (productNameRef.current) productNameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!adminId) {
      alert('Admin ID missing. Cannot submit product.');
      return;
    }

    const calculatedFinalPrice = (
      Number(price) * (1 - Number(discount || 0) / 100)
    ).toFixed(2);

    const productData = {
      productName,
      category,
      brand,
      description,
      price: Number(price),
      discount: Number(discount || 0),
      finalPrice: Number(calculatedFinalPrice),
      productImage,
      adminId: Number(adminId),
    };

    axios.post("http://localhost:8080/createProduct", productData)
      .then(res => {
        alert("Product Added Successfully");
        // Optionally, clear form:
        setProductName('');
        setCategory('');
        setBrand('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setProductImage('');
        // You might also navigate to the product list page:
        // navigate('/admin_page');
      })
      .catch(err => alert("Some Error Occurred"));
  };

  return (
    <>
      <AdminNavbar/>
      <div className="container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Add New Product</h2>
          <label>
            Product Name:<span>*</span>
            <input
              type="text"
              value={productName}
              ref={productNameRef}
              onChange={e => setProductName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Category:<span>*</span>
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Brand:<span>*</span>
            <input
              type="text"
              value={brand}
              onChange={e => setBrand(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <br />
          <label>
            Price ($):<span>*</span>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </label>
          <br />
          <label>
            Discount (%):
            <input
              type="number"
              value={discount}
              onChange={e => setDiscount(e.target.value)}
              min="0"
              max="100"
            />
          </label>
          <br />
          <label>
            Product Image URL:
            <input
              type="text"
              value={productImage}
              onChange={e => setProductImage(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

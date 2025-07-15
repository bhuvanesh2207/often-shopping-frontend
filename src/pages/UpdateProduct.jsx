import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  // Redirect if no product received
  useEffect(() => {
    if (!product) {
      alert("No product data received. Redirecting...");
      navigate("/admin_page");
    }
  }, [product, navigate]);

  // State variables (notice: no [id])
  const [productId] = useState(product?.id || ""); // Only this needed
  const [productName, setProductName] = useState(product?.productName || "");
  const [category, setCategory] = useState(product?.category || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [discount, setDiscount] = useState(product?.discount || "");
  const [productImage, setProductImage] = useState(product?.productImage || "");
  const [adminId,setAdminId] = useState(product?.adminId || "")

  useEffect(() => {
  const id = localStorage.getItem('id');
    if (id) {
      setAdminId(id);
    }}, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculating the final price
    const finalPrice = (Number(price) * (1 - Number(discount) / 100)).toFixed(2);
    
    const productData = {
      productId,         // <-- Backend expects this field
      productName,
      category,
      brand,
      description,
      price,
      discount,
      finalPrice,
      productImage,
      adminId
    };

    axios
      .post("http://localhost:8080/updateProduct", productData)
      .then((res) => {
        alert("Product Updated Successfully");
        navigate("/admin_page");
      })
      .catch((err) => {
        console.error(err);
        alert("Some Error Occurred");
      });
  };

  return (
    <div className="product-form">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <br />

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <br />

        <div className="form-group">
          <label>Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <br />

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <br />

        <div className="form-row">
          <div className="form-group">
            <label>Price ($):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label>Discount (%):</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min="0"
              max="100"
            />
          </div>
        </div>
        <br />

        <div className="form-group">
          <label>Product Image URL:</label>
          <input
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
        </div>
        <br />

        <button type="submit" className="submit-btn">
          Update Product
        </button>
      </form>
    </div>
  );
}

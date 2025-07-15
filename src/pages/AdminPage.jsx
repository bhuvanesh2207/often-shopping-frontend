import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      fetchProducts(id);
    }
  }, []);

  const fetchProducts = (id) => {
    axios
      .get('http://localhost:8080/getAllProducts?id=' + id)
      .then(res => {
        // Calculate final price for each product
        const productsWithFinalPrice = res.data.map(p => ({
          ...p, // fetch all details of product
          finalPrice: Number(
            (p.price * (1 - (p.discount || 0) / 100)).toFixed(2)
          ),
        }));
        setProducts(productsWithFinalPrice);
      })
      .catch(err => console.error('Failed to fetch products:', err));
  };

  const handleUpdate = (product) => {
    navigate('/update_product', { state: { product } });
  };

  const handleDelete = (productId) => {
    axios
      .get('http://localhost:8080/deleteProduct', { params: { id: productId } })
      .then(() => {
        alert("Deleted Successfully");
        const id = localStorage.getItem('id');
        if (id) {
          fetchProducts(id);
        }
      })
      .catch(err => {
        console.error('Delete failed:', err);
        alert("Delete failed");
      });
  };

  return (
    <>
      <h1>Admin Products Page</h1>
      <Link to="/changePassword_page"><button>Set New / Change Password</button></Link><br />
      <Link to="/add_product"><button>Add Products</button></Link>
      <table border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Final Price</th>
            <th>Product Image</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="10">No products found.</td>
            </tr>
          ) : (
            products.map(p => (
              <tr key={p.id}>
                <td>{p.productName}</td>
                <td>{p.category}</td>
                <td>{p.brand}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>{p.discount}</td>
                <td>{p.finalPrice}</td>
                <td>
                  <img src={p.productImage} alt={p.productName} height="40" width="50" />
                </td>
                <td>
                  <button onClick={() => handleUpdate(p)}>Update</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default ProductTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    // Fetch product details based on productId
    async function fetchProductDetails() {
      try {
        const response = await axios.get(`http://localhost:3451/getProductById/${productId}`);
        console.log("hfhfhv", response)
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Define inline CSS styles
  const containerStyle = {
    border: '2px solid #ccc',
    padding: '10px',
    maxWidth: '400px', // Adjust the width as needed
    margin: '0 auto', // Center align the container horizontally
    marginTop: '80px', // Add a top margin of 20px
  };
  
  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '200px', // Set the maximum height for the image
  };

  // Render product details when data is available
  return (
    <div style={containerStyle}>
      <h1>Product Details</h1>
      {product ? (
        <div>
          <p><strong>Name:</strong> {product.productname}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          {product.Image && (
            <img
              src={`http://localhost:3451/${product.Image}`}
              alt={product.productname}
              style={imageStyle}
            />
          )}
        </div>
      ) : (
        <div>Product not found.</div>
      )}
    </div>
  );
};

export default ProductDetails;

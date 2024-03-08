import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_Decode from 'jwt-decode';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faListAlt,
  faEdit,
  faTrash,
  faDollarSign,
  faSortAmountUp,
  faSortAmountDown,
  faCog,
  faImage,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import Navbar from './ProductNavbar';
import { Link } from 'react-router-dom';

function UserDashboard() {
  const token = localStorage.getItem('userToken');
  const decode = jwt_Decode(token);
  const organizationId = decode.user.organizationId;
  const id = decode.user._id;

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productname: '',
    brand: '',
    price: '',
    quantity: '',
    UserId: id,
    organizationId: organizationId,
    isActive: true,
    image: null, // Store the selected image file
  });

  const [updateFormData, setUpdateFormData] = useState({
    productname: '',
    brand: '',
    price: '',
    quantity: '',
    UserId: id,
    organizationId: organizationId,
    isActive: true,
    // image: null, // Store the selected image file for updating
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [products]);

  const calculateTotalPrice = () => {
    const total = products.reduce(
      (accumulator, product) =>
        accumulator + product.quantity * product.price,
      0
    );
    setTotalPrice(total);
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3451/getAllProducts?UserId=${id}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };
  const handleCreateProduct = async () => {
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('productname', formData.productname);
      formDataWithImage.append('brand', formData.brand);
      formDataWithImage.append('price', formData.price);
      formDataWithImage.append('quantity', formData.quantity);
      formDataWithImage.append('UserId', formData.UserId);
      formDataWithImage.append('organizationId', formData.organizationId);
      formDataWithImage.append('isActive', formData.isActive);
      formDataWithImage.append('image', formData.image); // Append the image file
  
      const response = await axios.post(
        'http://localhost:3451/createProduct',
        formDataWithImage,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('Product Added successfully!', {
        position: 'top-center',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      setProducts([...products, response.data.product]);
      setFormData({
        productname: '',
        brand: '',
        price: '',
        quantity: '',
        UserId: id,
        organizationId: organizationId,
        isActive: true,
        image: null, // Reset the image input field
      });
    } catch (error) {
      console.error(error);
  
      // Show an error Toastify notification
      toast.error('Error creating product. Please try again later.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3451/deleteProduct/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      toast.success('Product deleted successfully!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdateModal = (product) => {
    setUpdateFormData(product);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  
// const handleUpdate = async () => {
//   try {
//     const formDataWithImage = new FormData();
//     formDataWithImage.append('productname', updateFormData.productname);
//     formDataWithImage.append('brand', updateFormData.brand);
//     formDataWithImage.append('price', updateFormData.price);
//     formDataWithImage.append('quantity', updateFormData.quantity);
//     formDataWithImage.append('UserId', updateFormData.UserId);
//     formDataWithImage.append('organizationId', updateFormData.organizationId);
//     formDataWithImage.append('isActive', updateFormData.isActive);
//     // formDataWithImage.append('image', updateFormData.image); // Append the image file

//     const response = await axios.put(
//       `http://localhost:3451/updateProduct/${updateFormData._id}`,
//       formDataWithImage,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product._id === updateFormData._id ? updateFormData : product
//       )
//     );
//     setUpdateFormData({
//       productname: '',
//       brand: '',
//       price: '',
//       quantity: '',
//       UserId: id,
//       organizationId: organizationId,
//       isActive: true,
//       // image: null, // Reset the image input field
//     });
//     setShowUpdateModal(false);

//     toast.success(response.data.msg, {
//       position: 'top-center',
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'colored',
//     });
//   } catch (error) {
//     console.error(error);
//     toast.error('Error updating product. Please try again later.', {
//       position: 'top-center',
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'colored',
//     });
//   }
// };

//// main  =========================================>

const handleUpdate = async () => {
  try {
    const requestData = {
      productname: updateFormData.productname,
      brand: updateFormData.brand,
      price: updateFormData.price,
      quantity: updateFormData.quantity,
    };

    const response = await axios.put(
      `http://localhost:3451/updateProduct/${updateFormData._id}`,
      requestData
    );

    // Check the response status and update the state if successful
    if (response.status === 200) {
      // Update the product in the state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updateFormData._id ? response.data.product : product
        )
      );

      // Close the update modal and reset the form data
      setUpdateFormData({
        productname: '',
        brand: '',
        price: '',
        quantity: '',
      });
      setShowUpdateModal(false);

      toast.success(response.data.msg, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else {
      toast.error('Error updating product. Please try again later.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  } catch (error) {
    console.error(error);
    toast.error('Error updating product. Please try again later.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }
};



  const handleQuantityChange = (productId, change) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        const newQuantity = product.quantity + change;
        // Prevent the quantity from going negative
        if (newQuantity < 1) {
          return { ...product, quantity: 1 };
        }
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  
  // Handle search function
  const handleSearch = async (searchTerm) => {
    try {
      // Check if the searchTerm is empty
      if (!searchTerm) {
        // If it's empty, retrieve all products
        getAllProducts();
      } else {
        // If it's not empty, perform the search
        const response = await axios.post(
          'http://localhost:3451/search',
          { productname: searchTerm }
        );
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <Navbar onSearch={handleSearch} />

      <p style={{ color: '#2596BE' }}> Logged User : {decode.user.firstname}</p>
      <table
        style={{
          border: '1px solid black',
          borderCollapse: 'collapse',
          width: '100%',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: '1px solid black',
                padding: '8px',
                backgroundColor: '#2596be',
                color: 'white',
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ color: 'purple' }} /> Add Products
            </th>
            <th
              style={{
                border: '1px solid black',
                padding: '8px',
                backgroundColor: '#2596be',
                color: 'white',
              }}
            >
              <FontAwesomeIcon icon={faListAlt} style={{ color: '#00FF00' }} /> All Added Products
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '16px' }}>
              <input
                type="text"
                name="productname"
                placeholder="Product Name"
                value={formData.productname}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                min="1"
              />
              <br />
              <br />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
              />

              <br />
              <br />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileInputChange}

              />
              <br />
              <br />
              <button className="btn btn-primary" onClick={handleCreateProduct}>
                <FontAwesomeIcon icon={faPlus} style={{ color: '#800000' }} /> Add
              </button>
            </td>

            <td style={{ border: '1px solid black', padding: '16px' }}>
              <table
                style={{
                  border: '1px solid black',
                  borderCollapse: 'collapse',
                  width: '100%',
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor: '#2596be',
                        color: 'white',
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} style={{ color: 'yellow' }} /> Product Name
                    </th>
                    <th
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor: '#2596be',
                        color: 'white',
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} style={{ color: 'purple' }} /> Brand
                    </th>
                    <th
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor: '#2596be',
                        color: 'white',
                      }}
                    >
                      <FontAwesomeIcon icon={faDollarSign} style={{ color: 'blue' }} /> Price
                    </th>
                    <th
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor: '#2596be',
                        color: 'white',
                      }}
                    >
                      <FontAwesomeIcon icon={faSortAmountUp} style={{ color: 'red' }} /> Quantity
                    </th>
                    <th
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor: '#2596be',
                        color: 'white',
                      }}
                    >
                      <FontAwesomeIcon icon={faCog} style={{ color: 'purple' }} /> Actions
                    </th>
                    <th
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor: '#2596be',
                        color: 'white',
                      }}
                    >

                      <FontAwesomeIcon icon={faImage} style={{ color: 'orange' }} /> Image

                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        {product.productname}
                      </td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        {product.brand}
                      </td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        {product.price}
                      </td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        {product.quantity}
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleQuantityChange(product._id, 1)}
                          style={{ marginLeft: '5px', marginRight: '5px' }}
                        >
                          <FontAwesomeIcon icon={faSortAmountUp} />
                        </button>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleQuantityChange(product._id, -1)}
                        >
                          <FontAwesomeIcon icon={faSortAmountDown} />
                        </button>
                      </td>

                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteProduct(product._id)}
                          style={{ marginRight: '10px' }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>

                        <button
                          className="btn btn-warning"
                          onClick={() => openUpdateModal(product)}
                          style={{ marginRight: '10px' }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <Link to={`/productDetails/${product._id}`} className="btn btn-primary" style={{ marginLeft: '10px' }}>
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </td>

                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        {product.Image && (
                          <img
                            src={`http://localhost:3451/${product.Image}`}
                            alt={product.productname}
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                <FontAwesomeIcon icon={faDollarSign} /> Total Price: {totalPrice}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <Modal show={showUpdateModal} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="updateProductname" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="updateProductname"
                name="productname"
                value={updateFormData.productname}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    productname: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="updateBrand" className="form-label">
                Brand
              </label>
              <input
                type="text"
                className="form-control"
                id="updateBrand"
                name="brand"
                value={updateFormData.brand}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    brand: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="updatePrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="updatePrice"
                name="price"
                min="1" 
                value={updateFormData.price}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    price: e.target.value,

                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="updateQuantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="updateQuantity"
                name="quantity"
                min="1" 
                value={updateFormData.quantity}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    quantity: e.target.value,
                  })
                }
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="updateImage" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="updateImage"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setUpdateFormData({ ...updateFormData, image: file });
                }}
              />
            </div> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserDashboard;

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/category.css';
import './common.css';
import Sidebar from "./global/Sidebar";
import Topbar from "./global/Topbar";

// Then import environment variable
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function AddCategory() {
  // State variables
  const [name, setName] = useState(''); // Stores the category name
  const [successMsg, setSuccessMsg] = useState(''); // Stores the success message
  const [errorMsg, setErrorMsg] = useState(''); // Stores the error message

  // Event handler for name input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (!name) {
      setErrorMsg('Please enter a category name.'); // Display error message if name is empty
      setSuccessMsg(''); // Clear success message
      return;
    }

    // Check if the category name is a number
    if (!isNaN(name)) {
      setErrorMsg('Numbers are not allowed as category names.'); // Display error message if name is a number
      setSuccessMsg(''); // Clear success message
      return;
    }

    // Check if category name already exists
    // Replace 'existingCategories' with the actual array of existing category names
    const existingCategories = ['Category 1', 'Category 2', 'Category 3']; // Example array
    if (existingCategories.includes(name)) {
      setErrorMsg('Category name already exists.'); // Display error message if name already exists
      setSuccessMsg(''); // Clear success message
      return;
    }

    // API request to add the category
    axios
      .post(`${apiUrl}/admin/addCategory`, {
        name,
      })
      .then((response) => {
        console.log(response.data);
        setSuccessMsg('Category successfully added.'); // Set success message
        setName(''); // Clear the name input field
        setErrorMsg(''); // Clear error message
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg('Failed to add category. Please try again later.'); // Set error message
        setSuccessMsg(''); // Clear success message
      });
  };

  return (
    <div className='mainAdmin'>
      <div className="adminSidebar">
      <Sidebar></Sidebar>
      </div>
      <div className="adminContent">
      <div className="add-category-container">
      <Topbar></Topbar>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
        <button type="submit">Add Category</button>
        {errorMsg && <p className="error">{errorMsg}</p>} {/* Display error message if it exists */}
        {successMsg && <p className="success">{successMsg}</p>} {/* Display success message if it exists */}
       </form>
       </div>
      </div>
    </div>
  );
}

export default AddCategory;

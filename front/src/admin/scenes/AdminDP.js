import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";

import '../styles/delete.css';
import './common.css';
import Sidebar from "./global/Sidebar";
// Then import environment variable
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';


function DeletePost() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  const [query, setSearchQuery] = useState('');

  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    // Fetch posts on component mount
    axios
      .get(`${apiUrl}/staff/viewPost?keyword=${query}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch posts. Please try again later.');
      });
  }, [query]);

  const handleDelete = (postId) => {
    // Set the confirmation flag and post ID to delete
    setConfirmDelete(true);
    setPostIdToDelete(postId);
  };

  const confirmDeletePost = () => {
    // Send delete request and handle success/error
    axios
      .delete(`${apiUrl}/admin/deletePost`, { data: { postId: postIdToDelete } })
      .then((response) => {
        console.log(response.data);
        setMessage('Post successfully deleted.');
        setPosts(posts.filter((post) => post.postId !== postIdToDelete));
        cancelDelete();
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to delete post. Please try again later.');
        setMessage(''); // Clear the success message
        cancelDelete();
      });
  };

  const cancelDelete = () => {
    // Reset confirmation flag and post ID
    setConfirmDelete(false);
    setPostIdToDelete('');
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    // Change the current page
    setCurrentPage(pageNumber);
  };

  return (
    <div className='mainAdmin'>
      <div className="adminSidebar">
      <Sidebar></Sidebar>
      </div>
      <div className="adminContent">
    <div className='delete-container'>
      <h2>Delete Post</h2>
      
      <TextField
  id="search-bar"
  className="text"
  onInput={(e) => {
    setSearchQuery(e.target.value);
  }}
  label="Search For Post"
  variant="outlined"
  placeholder="Search..."
  size="small"
  style={{
    width: "60%",
    marginBottom: "10px",
    borderRadius: "5px",
    backgroundColor: "#f2f2f2",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  }}
  InputProps={{
    style: {
      paddingLeft: "10px",
    },
  }}
/>


      <table>
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Content</th>
            <th>Category ID</th>
            <th>Staff Name</th>
            <th>Event Location</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.postId}>
              <td>{post.postId}</td>
              <td>{post.content}</td>
              <td>{post.categoryId}</td>
              <td>{post.staffName}</td>
              <td>{post.eventLocation}</td>
              <td>
                <button className='delete-btn' onClick={() => handleDelete(post.postId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && !confirmDelete && <p className='error'>{error}</p>} {/* Display error message if error occurs */}
      {message && !confirmDelete && <p>{message}</p>} {/* Display success message if available */}
      <div className='pagination'>
        {posts.length > postsPerPage &&
          Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>

      {confirmDelete && (
        <div className='confirmation-modal'>
          <div className='confirmation-content'>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this post?</p>
            <div>
              <button className='confirm-btn' onClick={confirmDeletePost}>
                Confirm
              </button>
              <button className='cancel-btn' onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

export default DeletePost;

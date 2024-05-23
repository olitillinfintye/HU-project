import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import '../styles/banapprove.css';
import './common.css';

import Sidebar from "./global/Sidebar";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function BanApprove() {
  // State variables
  const [staffAccounts, setStaffAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [query, setSearchQuery] = useState('');

  // Fetch staff accounts on component mount
  useEffect(() => {
    fetchStaffAccounts();
  }, [query]);

  // Fetch staff accounts from the server
  const fetchStaffAccounts = () => {
    axios
      .get(`${apiUrl}/staff/searchStaff?keyword=${query}`)
      .then((response) => {
        
        setStaffAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg('Failed to fetch staff accounts. Please try again.');
      });
  };


  // Handle staff action selection
  const handleAction = (staffId, action) => {
    setSelectedStaffId(staffId);
    setSelectedAction(action);
  };

  // Confirm the selected action (Ban/Approve)
  const confirmAction = () => {
    if (selectedAction === 'ban') {
      banStaffAccount(selectedStaffId);
    } else if (selectedAction === 'approve') {
      approveStaffAccount(selectedStaffId);
    }
    setSelectedStaffId('');
    setSelectedAction('');
  };

  // Ban a staff account
  const banStaffAccount = (staffId) => {
    axios
      .put(`${apiUrl}/admin/banAcc`, { staffId })
      .then((response) => {
        if (response.data.success) {
          setSuccessMsg('Staff account banned successfully.');
          updateAccountStatus(staffId, 'Banned');
        } else {
          setErrorMsg(response.data.message || 'Failed to ban staff account.');
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(
          error.response?.data?.message || 'Failed to ban staff account. Please try again later.'
        );
      });
  };

  // Approve a staff account
  const approveStaffAccount = (staffId) => {
    axios
      .put(`${apiUrl}/admin/approveAcc`, { staffId })
      .then((response) => {
        if (response.data.success) {
          setSuccessMsg('Staff account approved successfully.');
          updateAccountStatus(staffId, 'Approved');
        } else {
          setErrorMsg(response.data.message || 'Failed to approve staff account.');
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(
          error.response?.data?.message || 'Failed to approve staff account. Please try again later.'
        );
      });
  };

  // Update the status of a staff account
  const updateAccountStatus = (staffId, status) => {
    setStaffAccounts((prevAccounts) =>
      prevAccounts.map((staff) => {
        if (staff.staffId === staffId) {
          return { ...staff, isVerified: status === 'Approved' };
        }
        return staff;
      })
    );
  };

  // Calculate total number of pages based on the staff count
  const totalPages = Math.ceil(staffAccounts.length / 5);

  // Get the staff accounts to display on the current page
  const getCurrentPageStaff = () => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    return staffAccounts.slice(startIndex, endIndex);
  };

  // Go to the previous page
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Go to the next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Render component
  return (
    <div className='mainAdmin'>
      <div className="adminSidebar">
      <Sidebar></Sidebar>
      </div>
      <div className="adminContent">
    <div className="ban-approve-container">

    <h2>Ban/Approve Staff Account</h2>

    <TextField
  id="search-bar"
  className="text"
  onInput={(e) => {
    setSearchQuery(e.target.value);
  }}
  label="search staff by His name"
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
            <th>Staff ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageStaff().map((staff) => (
            <tr key={staff.staffId}>
              <td>{staff.staffId}</td>
              <td>{staff.fullname}</td>
              <td>{staff.email}</td>
              <td>
                {staff.isVerified ? (
                  <button
                    className="ban-btn"
                    onClick={() => handleAction(staff.staffId, 'ban')}
                  >
                    Ban
                  </button>
                ) : (
                  <button
                    className="approve-btn"
                    onClick={() => handleAction(staff.staffId, 'approve')}
                  >
                    Approve
                  </button>
                )}
              </td>
              <td>{staff.isVerified ? 'Approved' : 'Banned'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {errorMsg && <p className="error">{errorMsg}</p>}
      {successMsg && <p className="success">{successMsg}</p>}

      {selectedStaffId && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h3>Confirm {selectedAction === 'ban' ? 'Ban' : 'Approve'}</h3>
            <p>
              Are you sure you want to {selectedAction === 'ban' ? 'ban' : 'approve'} this staff
              account?
            </p>
            <div>
              <button className="confirm-btn" onClick={confirmAction}>
                Confirm
              </button>
              <button className="cancel-btn" onClick={() => setSelectedStaffId('')}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={goToPreviousPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={goToNextPage}>
          Next
        </button>
      </div>
      </div>
      </div>
      </div>
  );
}

export default BanApprove;

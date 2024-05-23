import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/dashboard.css';
import './common.css';
import Sidebar from "./global/Sidebar";

// Then import environment variable
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function Dashboard() {
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetches data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/getAllData`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handles the click event on a dashboard item
  const handleItemClick = (label) => {
    setSelectedItem(label);
  };

  // Handles the click event on the back button
  const handleBackButtonClick = () => {
    setSelectedItem(null);
  };

  const itemsPerPage = 10;

  return (
    <div className='mainAdmin'>
      <div className="adminSidebar">
        <Sidebar />
      </div>
      <div className="adminContent">
        <div className="dashboard">
          {data ? (
            <>
              {!selectedItem ? (
                <>
                  {/* Render the dashboard items */}
                  <DashboardItem
                    label="Students"
                    value={data.counts.students}
                    additionalInfo="total number of students..."
                    onClick={handleItemClick}
                  />
                  <DashboardItem
                    label="Staff"
                    value={data.counts.staff}
                    additionalInfo="total number of staff..."
                    onClick={handleItemClick}
                  />
                  <DashboardItem
                    label="Departments"
                    value={data.counts.departments}
                    additionalInfo="total number of departments..."
                    onClick={handleItemClick}
                  />
                  <DashboardItem
                    label="Posts"
                    value={data.counts.posts}
                    additionalInfo="total number of posts..."
                    onClick={handleItemClick}
                  />
                  <DashboardItem
                    label="Categories"
                    value={data.counts.categories}
                    additionalInfo="total number of categories..."
                    onClick={handleItemClick}
                  />
                  <DashboardItem
                    label="Schools"
                    value={data.counts.schools}
                    additionalInfo="total number of schools..."
                    onClick={handleItemClick}
                  />
                </>
              ) : (
                <div className="data-table">
                  <DataTable label={selectedItem} data={data.data} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                  <button className="back-button" onClick={handleBackButtonClick}>
                    Back
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardItem({ label, value, additionalInfo, onClick }) {
  const handleClick = () => {
    onClick(label);
  };
  return (
    <div className="rectangle" onClick={handleClick}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="additional-info">{additionalInfo}</div>
    </div>
  );
}

function DataTable({ label, data, itemsPerPage, currentPage, setCurrentPage }) {
  let tableData;
  let slicedData;

  if (!data) {
    tableData = <tr><td colSpan="10">No data available</td></tr>;
  } else {
    switch (label) {
      case 'Students':
        // Render the students table
        tableData = data.students.map((student) => (
          <tr key={student.studentId}>
            <td>{student.fullname}</td>
            <td>{student.picture}</td>
            <td>{student.year}</td>
            <td>{student.Department}</td>
          </tr>
        ));
        break;
      case 'Staff':
        // Render the staff table
        tableData = data.staff.map((staff) => (
          <tr key={staff.staffId}>
            <td>{staff.fullname}</td>
            <td>{staff.picture}</td>
            <td>{staff.isVerified}</td>
            {/* Add more columns as needed */}
          </tr>
        ));
        break;
      case 'Departments':
        // Render the departments table
        tableData = data.departments.map((department) => (
          <tr key={department.depId}>
            <td>{department.name}</td>
            <td>{department.ShortedName}</td>
            <td>{department.School}</td>
          </tr>
        ));
        break;
      case 'Posts':
        // Render the posts table
        tableData = data.posts.map((post) => (
          <tr key={post.postId}>
            <td>{post.staffName}</td>
            <td>{post.eventLocation}</td>
            <td>{post.content}</td>
          </tr>
        ));
        break;
      case 'Categories':
        // Render the categories table
        tableData = data.categories.map((category) => (
          <tr key={category.categoryId}>
            <td>{category.name}</td>
            <td>{category.description}</td>
          </tr>
        ));
        break;
      case 'Schools':
        // Render the schools table
        tableData = data.schools.map((school) => (
          <tr key={school.schoolId}>
            <td>{school.name}</td>
          </tr>
        ));
        break;
      default:
        tableData = null;
    }

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    slicedData = tableData.slice(indexOfFirstItem, indexOfLastItem);
  }

  // Handles the click event on a pagination button
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <table>
      {/* Table header */}
      <thead>
        <tr>
          <th>Name</th>
          {label === 'Students' && <th>Picture</th>}
          {label === 'Students' && <th>Year</th>}
          {label === 'Students' && <th>Department</th>}
          {label === 'Staff' && <th>Picture</th>}
          {label === 'Staff' && <th>isVerified</th>}
          {label === 'Departments' && <th>ShortedName</th>}
          {label === 'Departments' && <th>School</th>}
          {label === 'Posts' && <th>eventLocation</th>}
          {label === 'Posts' && <th>Content</th>}
          {label === 'Categories' && <th>Description</th>}
        </tr>
      </thead>
      {/* Table body */}
      <tbody>
        {slicedData || <tr><td colSpan="10">No data available</td></tr>}
      </tbody>
      {data && (
        <tfoot>
          <tr>
            <td colSpan="10">
              <div className="pagination">
                {/* Render pagination buttons */}
                {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }).map((_, index) => (
                  <button
                    key={index + 1}
                    className={currentPage === index + 1 ? 'active' : ''}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}

export default Dashboard;

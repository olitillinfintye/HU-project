import React, { useState, useEffect } from 'react';
import '../styles/addsd.css';
import './common.css';
import axios from 'axios';
import Sidebar from "./global/Sidebar";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function AddSD() {
  // State variables
  const [schoolName, setSchoolName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [departmentSchoolId, setDepartmentSchoolId] = useState('');
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeForm, setActiveForm] = useState('');

  // Fetch schools on component mount
  useEffect(() => {
    fetchSchools();
  }, []);

  // Fetch schools from API
  const fetchSchools = () => {
    axios
      .get(`${apiUrl}/admin/getSchool`)
      .then((response) => {
        setSchools(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch schools. Please try again later.');
      });
  };

  // Validate if a string contains numbers
  const containsNumbers = (str) => {
    return /\d/.test(str);
  };

  // Add a new school
  const handleAddSchool = async () => {
    // Validate school name
    if (schoolName.trim() === '') {
      setError('Please enter a school name.');
      return;
    }

    // Check if the school name contains numbers
    if (containsNumbers(schoolName)) {
      setError('Numbers are not allowed in the school name. Please enter a valid name.');
      return;
    }

    // Generate shortened name from school name
    const shortedName = schoolName.trim().split(/\s+/).map((word) => word.charAt(0)).join('').toUpperCase();

    // Check if the school already exists
    const existingSchool = schools.find((school) => school.name.toLowerCase() === schoolName.toLowerCase());
    if (existingSchool) {
      setError('School already exists. Please enter a different name.');
      return;
    }

    try {
      // Send request to add school
      const response = await axios.post(`${apiUrl}/admin/addSchool`, {
        name: schoolName,
        shortedName,
      });
      console.log(response.data);

      // Set success message and reset form and state
      setSuccessMessage('School added successfully');
      setSchoolName('');
      setActiveForm('');
    } catch (error) {
      console.error(error);
      setError('Failed to add school. Please try again later.');
    }
  };

  // Add a new department
  const handleAddDepartment = async () => {
    // Validate department name and selected school
    if (departmentName.trim() === '') {
      setError('Please enter a department name.');
      return;
    }

    // Check if the department name contains numbers
    if (containsNumbers(departmentName)) {
      setError('Numbers are not allowed in the department name. Please enter a valid name.');
      return;
    }

    if (departmentSchoolId === '') {
      setError('Please select a school.');
      return;
    }

    // Check if the department already exists in the selected school
    const selectedSchool = schools.find((school) => school.schoolId === departmentSchoolId);
    if (selectedSchool) {
      const existingDepartment = selectedSchool.departments.find(
        (department) => department.name.toLowerCase() === departmentName.toLowerCase()
      );
      if (existingDepartment) {
        setError('Department already exists in the selected school. Please enter a different name.');
        return;
      }
    }

    try {
      // Send request to add department
      const response = await axios.post(`${apiUrl}/admin/addDep`, {
        name: departmentName,
        shortedName: departmentName.trim().split(/\s+/).map((word) => word.charAt(0)).join('').toUpperCase(),
        schoolId: departmentSchoolId,
      });
      console.log(response.data);

      // Set success message and reset form and state
      setSuccessMessage('Department added successfully');
      setDepartmentName('');
      setDepartmentSchoolId('');
      setActiveForm('');
    } catch (error) {
      console.error(error);
      setError('Failed to add department. Please try again later.');
    }
  };

  // Show the add school form
  const showAddSchoolForm = () => {
    setActiveForm('addSchool');
    setError('');
    setSuccessMessage('');
  };

  // Show the add department form
  const showAddDepartmentForm = () => {
    setActiveForm('addDepartment');
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className='mainAdmin'>
      <div className="adminSidebar">
      <Sidebar></Sidebar>
      </div>
      <div className="adminContent">
    <div className="container">
      <h3>Add School and Department</h3>
      {/* Show error message if there is an error */}
      {error && <p className="error">{error}</p>}
      {/* Show success message if available */}
      {successMessage && <p className="success">{successMessage}</p>}
      <div>
        <button className={activeForm === 'addSchool' ? 'active' : ''} onClick={showAddSchoolForm}>
          Add School
        </button>
        <button className={activeForm === 'addDepartment' ? 'active' : ''} onClick={showAddDepartmentForm}>
          Add Department
        </button>
      </div>
      {/* Show the add school form */}
      {activeForm === 'addSchool' && (
        <div>
          <input
            type="text"
            placeholder="School Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
          <button onClick={handleAddSchool}>Add School</button>
        </div>
      )}
      {/* Show the add department form */}
      {activeForm === 'addDepartment' && schools.length > 0 && (
        <div>
          <input
            type="text"
            placeholder="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
          <select value={departmentSchoolId} onChange={(e) => setDepartmentSchoolId(e.target.value)}>
            <option value="">Select a School</option>
            {/* Render the list of schools */}
            {schools.map((school) => (
              <option key={school.schoolId} value={school.schoolId}>
                {school.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddDepartment}>Add Department</button>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

export default AddSD;

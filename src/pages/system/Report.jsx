import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const Report = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/report")
      .then((res) => setStaff(res.data));
  }, []);

  // Convert staff array to CSV format
  const downloadCSV = () => {
    const headers = ['Name', 'Gender', 'Email', 'Dob', 'Phone', 'Address', 'Post', 'Department'];
    const rows = staff.map((staff) => [
      staff.name,
      staff.gender,
      staff.email,
      staff.dob,
      staff.phone,
      staff.address,
      staff.postTitle,
      staff.depname
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employee_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Navbar />
      <div className='flex justify-center pt-16'>
        <div className='space-y-4 w-full max-w-6xl'>
          {/* Download Button */}
          <div className='flex justify-end'>
            <button 
              onClick={downloadCSV} 
              className='bg-black text-white px-4 py-2 rounded shadow-md font-medium hover:bg-gray-800 transition'>
              Download Report
            </button>
          </div>

          {/* Header Row */}
          <div className='text-white p-4 flex space-x-12 bg-black rounded shadow-md text-sm font-medium'>
            <div>Names</div>
            <div>Gender</div>
            <div>Email</div>
            <div>Dob</div>
            <div>Phone</div>
            <div>Address</div>
            <div>Post</div>
            <div>Department</div>
          </div>

          {/* Staff Data Rows */}
          {staff.map(staff => (
            <div 
              key={staff.employeeId} 
              className='text-black p-6 flex space-x-4 bg-white rounded shadow-md text-sm font-medium'>
              <div>{staff.name}</div>
              <div>{staff.gender}</div>
              <div>{staff.email}</div>
              <div>{staff.dob}</div>
              <div>{staff.phone}</div>
              <div>{staff.address}</div>
              <div>{staff.postTitle}</div>
              <div>{staff.depname}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;

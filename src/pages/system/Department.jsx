import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import DepartForm from '../../components/forms/DepartForm';
import axios from 'axios';
import Delete from '../../components/buttons/Delete';
import Edit from '../../components/buttons/Edit';
import { FaX } from 'react-icons/fa6';

const Department = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [department, setDepartment] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  // Fetch departments
  useEffect(() => {
    axios.get("http://localhost:5000/api/getDepartment")
      .then((res) => setDepartment(res.data));
  }, []);

  const openEdit = (dept) => {
    setSelectedDept(dept);
    setIsOpen(true);
  };

  const closeEdit = () => {
    setSelectedDept(null);
    setIsOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className='flex justify-center pt-16'>
        <div className='space-y-6 w-full max-w-3xl'>
          <DepartForm />

          <div className='bg-white rounded shadow-md p-8'>
            <h1 className='flex justify-center font-medium text-lg mb-4'>Departments</h1>
            <div className='space-y-4'>
              {department.map(dept => (
                <div key={dept.depId} className='flex justify-between items-center bg-amber-900 text-white rounded p-2 shadow-sm'>
                  <div className='text-sm font-medium'>{dept.depname}</div>
                  <div className='space-x-2'>
                    <Delete id={dept.depId} />
                    <button
                      onClick={() => openEdit(dept)}
                      className='bg-black text-amber-500 text-sm font-medium rounded shadow-sm px-3 py-1'
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Modal */}
          {isOpen && selectedDept && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <div className='bg-white rounded s[] shadow-lg w-full max-w-md relative'>
                <button
                  onClick={closeEdit}
                  className='absolute top-3 right-3 text-black hover:text-red-500'
                >
                  <FaX />
                </button>
                <h2 className='text-center font-medium mb-4 text-lg'>Edit Department</h2>
                <Edit depname={selectedDept.depname} id={selectedDept.depId} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Department;

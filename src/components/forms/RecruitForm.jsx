import axios from 'axios';
import React, { useEffect, useState } from 'react'

const RecruitForm = () => {
    const [staff, setStaff] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/api/getStaff")
        .then((res) => setStaff(res.data));
    })
  return (
    <form  className='flex flex-col w-96 bg-white rounded p-8 space-y-4 shadow-md'>
        <h1 className='flex justify-center font-medium'>Create Post</h1>
        <select className='border rounded px-2 py-3'>
            <option value="">select employee</option>
            {staff.map(staff => (
                <option key={staff.employeeId} value={staff.employeeId}>{staff.firstname }{staff.lastname}</option>
            ))}
        </select>
        <input
        type='date'
        name='date'
        placeholder='Recruition Date'
        className='border rounded px-2 py-3'
        required
        />
        <input
        type='text'
        name='salary'
        placeholder='Salary'
        className='border rounded px-2 py-3'
        required
        />
        <input
        type='text'
        name='status'
        placeholder='Status'
        className='border rounded px-2 py-3'
        required
        />
        <button type='submit' className='bg-black shadow-sm text-white font-medium rounded p-2'>Recruit</button>
    </form>
  )
}

export default RecruitForm
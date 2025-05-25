import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DepartForm = () => {
    const [formData, setFormData] = useState({
        depname: ''
    });
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/department", formData)
            alert(res.data.message);
            setFormData({
                depname: ''
            })
        } catch (error) {
            alert('failed to add department')
        }
    }    
  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-96 bg-white rounded p-8 space-y-4 shadow-md'>
        <h1 className='flex justify-center font-medium'>Create Department</h1>
        
        <input
        type='text'
        name='depname'
        className='border rounded px-2 py-3'
        placeholder='DepartmentName'
        value={formData.depname}
        onChange={handleChange}
        required
        />
        <button type='submit' className='bg-black shadow-sm text-white font-medium rounded p-2'>Add Department</button>
    </form>
  )
}

export default DepartForm
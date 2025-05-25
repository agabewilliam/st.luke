import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StaffForm = () => {
    const [formData, setFormData] = useState({
      department: '',
      post: '',
      firstname: '',
      lastname: '',
      gender: '',
      dob: '',
      email: '',
      phone: '',
      address: ''

    });
    const [post, setPost] = useState([]);
    const [department, setDepartment] = useState([]);
  //fetch posts
    useEffect(() =>{
        axios.get("http://localhost:5000/api/getPosts")
        .then((res) => setPost(res.data))
    })
  //fetch department  
  useEffect(() =>{
        axios.get("http://localhost:5000/api/getDepartment")
        .then((res) => setDepartment(res.data))
    })
    //get form data
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5000/api/staff", formData)
        alert(res.data.message);
        setFormData({
          post,
        firstname,
        lastname,
        gender,
        dob,
        email,
        phone,
        address,
        department
        });
      } catch (error) {
        alert('failed to add staffs');
      }
    }
  return (
    <form onSubmit={handleSubmit} className='  max-w-xl bg-white rounded p-8  shadow-md'>
          <h1 className='flex justify-center font-medium'>Add Staff</h1>
        <div className='flex space-x-2 pt-4'>
         <div className='flex flex-col space-y-4'>
          <select name='department' className='border rounded px-2 py-3' value={formData.department} onChange={handleChange}>
            <option value="">select department</option>
            {department.map(department => (
                <option key={department.depId} value={department.depId}>{department.depname}</option> 
        ))}
        </select>
          <select name='post' className='border rounded px-2 py-3' value={formData.post} onChange={handleChange}>
            <option value="">select post</option>
            {post.map(post => (
                <option key={post.postId} value={post.postId}>{post.PostTitle}</option> 
        ))}
        </select>
        <input
        type='text'
        name='firstname'
        placeholder='firstName'
        className='border rounded px-2 py-3'
        value={formData.firstname}
        onChange={handleChange}
        required
        />
        <input
        type='text'
        name='lastname'
        placeholder='lasttName'
        className='border rounded px-2 py-3'
        value={formData.lastname}
        onChange={handleChange}
        required
        />
        <select name='gender' className='border rounded px-2 py-3' value={formData.gender} onChange={handleChange} required>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
         </div>
        <div  className='flex flex-col space-y-4'>
        <input
        type='text'
        name='dob'
        placeholder='DOB'
        className='border rounded px-2 py-3'
        value={formData.dob}
        onChange={handleChange}
        required
        />
          <input
        type='email'
        name='email'
        placeholder='Email'
        className='border rounded px-2 py-3'
        value={formData.email}
        onChange={handleChange}
        required
        />
        <input
        type='text'
        name='phone'
        placeholder='phone'
        className='border rounded px-2 py-3'
        value={formData.phone}
        onChange={handleChange}
        required
        />
        <input
        type='text'
        name='address'
        placeholder='Address'
        className='border rounded px-2 py-3'
        value={formData.address}
        onChange={handleChange}
        required
        />
        </div>
        </div>
        <div className='flex justify-end pt-4'>
          <button type='submit' className='flex justify-center bg-black shadow-sm text-white font-medium rounded p-2'>Add staff</button>
        </div>
    </form>
  )
}

export default StaffForm
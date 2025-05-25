import axios from 'axios';
import React, { useState } from 'react'

const PostForm = () => {
     const [formData, setFormData] = useState({
            PostTitle: ''
        });
        const handleChange = (e) => {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
        const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/post", formData)
            alert(res.data.message);
            setFormData({
                PostTitle: ''
            })
        } catch (error) {
            alert('failed to add post')
        }
    }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-96 bg-white rounded p-8 space-y-4 shadow-md'>
        <h1 className='flex justify-center font-medium'>Create Post</h1>
        <input
        type='text'
        name='PostTitle'
        placeholder='postTitle'
        className='border rounded px-2 py-3'
        value={formData.PostTitle}
        onChange={handleChange}
        required
        />
        <button type='submit' className='bg-black shadow-sm text-white font-medium rounded p-2'>Add Post</button>
    </form>
  )
}

export default PostForm
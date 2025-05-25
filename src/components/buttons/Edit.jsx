import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaX } from 'react-icons/fa6';

const Edit = ({id, depname}) => {
    const [formData, setFormData] = useState({
        depname: ''
    });

        useEffect(() => {
            setFormData({depname});
        }, [depname]);


        const handleChange = (e) => {
            setFormData({...formData, [e.target.name]: e.target.value});
        }

        const handleSubmit = async(e) => {
            e.preventDefault();
            try {
                const res = await axios.put(`http://localhost:5000/api/updateDepart/${id}`, formData);
                alert(res.data.message || 'updated');
            } catch (error) {
                alert('failed to update');
            }
        }
  return (
    <div>
        <form onSubmit={handleSubmit} className=' space-x-6  bg-white rounded p-8  shadow-md'> 
            
        <input
        type='text'
        name='depname'
        value={formData.depname}
        onChange={handleChange}
        className='border rounded px-2 py-2'
        />
        <button type='submit'
         className=' bg-black shadow-sm text-white font-medium rounded p-2'
         >
            Update
         </button>
        </form>
    </div>
  )
}

export default Edit
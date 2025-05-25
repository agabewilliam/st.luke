import axios from 'axios'
import React from 'react'

const Delete = ({id}) => {
    const handleDelete = async() => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/deleteDepart/${id}`) 
            alert(res.data.message);
        } catch (error) {
            alert('failed to delete');
        }
    }
  return (
    <button onClick={handleDelete} className='bg-black rounded shadow-sm p-2 text-amber-500 text-sm font-medium'>
        Delete
    </button>
  )
}

export default Delete
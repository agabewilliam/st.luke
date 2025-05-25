import React from 'react'
import Navbar from '../components/Navbar'
import { Navigate } from 'react-router-dom';

const Home = () => {
    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate to = '/'/>
    }
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center pt-16'>
            <h1 className='text-md font-bold'>Welcome to Employee management system</h1>
        </div>
    </div>
  )
}

export default Home
import React from 'react'
import Navbar from '../../components/Navbar'
import StaffForm from '../../components/forms/StaffForm'

const AddEmployee = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center pt-16'>
            <div>
                <div>
                   <StaffForm/> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEmployee
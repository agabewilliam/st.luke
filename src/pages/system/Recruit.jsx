import React from 'react'
import Navbar from '../../components/Navbar'
import RecruitForm from '../../components/forms/RecruitForm'

const Recruit = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center pt-16'>
            <div>
                <div>
                   <RecruitForm/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Recruit
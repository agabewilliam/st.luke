import React from 'react'
import Navbar from '../../components/Navbar'
import PostForm from '../../components/forms/PostForm'

const Post = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center pt-16'>
            <div>
                <div>
                   <PostForm/> 
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Post
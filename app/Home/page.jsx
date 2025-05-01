"use client"
import React from 'react'
import PostComponent from '../_components/PostComponent'
// import db from '../_features/utils/db'
// import Tweet from '../_models/tweet'
// import User from '../_models/user'



export default  function Home() {

 
// const post=await User.find()
// console.log(post,"post")



  return (
    <div className='px-1 border-l-1 border-r-1 border-white'>
      
      <PostComponent/>
      Home Page
      
      </div>
  )
}

"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Communities() {

  const router=useRouter()


  return (
    <div className='text-white flex flex-col items-center '>
      
      <p className='text-center mt-4 mb-4'>
        Communities
        </p>
    
    
    <div>
      <button className='text-sm border-1 border-gray-700 rounded-full px-2 py-1 cursor-pointer' onClick={()=>router.push('/Home/createCommunity')}>create your own community</button>
      </div>

      <div className='flex items-center justify-center flex-col'>
        <img src={"https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e53554e46008016518d52e4_peep-36.svg"}/>
        <p className='text-center'>No community you have created</p>
        </div>
    
    </div>
  )
}

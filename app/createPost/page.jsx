
"use client"
import React from 'react'
import PostComponent from '../_components/PostComponent'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function Page() {

    const router=useRouter()
  return (
    <div className='text-white flex flex-col w-full max-w-full px-2 mx-auto  border-white'>
        <div className='justify-start pl-2 flex gap-2  items-center mt-2 rounded-full font-sans'  onClick={()=>router.push('/Home')}>

            <FaLongArrowAltLeft/>
            <button>Home</button>
            
        </div>
        
   

        <div>
            <PostComponent/>
        </div>
        
        
        
        </div>
  )
}

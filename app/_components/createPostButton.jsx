import React from 'react'
import { ImLeaf } from "react-icons/im";
import { useRouter } from 'next/navigation';

export default function CreatePostButton() {
    const router=useRouter();
    
  return (
    <div className='text-white'>

        <button className='flex items-center justify-center  gap-2  w-full max-w-full bg-black px-2 py-1 text-blue-400 border-white border-1 rounded-full mt-1' onClick={()=>{router.push('/createPost')}}>
            create Post 
            <ImLeaf className='fill-blue-400'/>
        </button>
    </div>
  )
}

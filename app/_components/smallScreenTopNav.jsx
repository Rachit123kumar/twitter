import { useRouter } from 'next/navigation';
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";


export default function SmallScreenTopNav() {


    const router=useRouter()


  return (
    <div className='flex max-w-full items-center text-white justify-between mt-1'>

        <div><img src={'/boy.png'} alt="" className='h-10 w-10 rounded-full ring-1 ring-gray-950'/></div>
        <div onClick={()=>router.push('/Home')}> <FaXTwitter className='size-6'/></div>
        <div>
            <button className='px-4 py-1 border-1 bg-gray-950 border-gray-600'>Premium </button>
        </div>
    </div>
  )
}

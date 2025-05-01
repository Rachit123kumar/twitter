import React from 'react'
import { FaSearch } from "react-icons/fa";
export default function Search() {
  return (
    <div className='flex gap-3 rounded-full border-1 border-white px-8 py-2 text-sm  items-center justify-center mt-2'>

<div className='flex items-center gap-2'>
    <span><FaSearch className='fill-gray-300 size-3 '/></span>
    <input  type="text" className='text-white w-full outline-none border-none '/>
</div>


    </div>
  )
}

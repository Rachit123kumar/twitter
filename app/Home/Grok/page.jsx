import React from 'react'
import { FaClockRotateLeft } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { SiDeepin } from "react-icons/si";

export default function GrOk() {
  return (
    <div className='text-white max-w-[762px] md:max-w-[700px] mx-auto '>

      <div className=' flex md:hidden text-white justify-between px-2 py-2 '>
        <div>
          <img className='rounded-full ring-2 ring-blue-400 ' src={'/boy.png'} height={25} width={25} />

        </div>

        <div>
          Grok3

        </div>
        <div className='flex gap-3 '>
          <div>
            <span><FaClockRotateLeft className='fill-white' /></span>
          </div>
          <div>
            <span><FiEdit className='text-gray-300' /></span>

          </div>
        </div>
      </div>

      <div className='max-w-[762px] md:max-w-[700px] mt-5 text-white flex mx-auto pb-2  gap-2  justify-center bg-gray-700 rounded-full px-2 py-2 items-center'>
        <div>
          <img className='rounded-full ring-2 ring-blue-400 ' src={'/boy.png'} height={40} width={40} />

        </div>
        <div>
          <p className='font-bold ' >
            Draw me

          </p>
          <p className='text-gray-400'>Click here to try a random style </p>
        </div>


      </div>

      <div className='text-white'>
        <p className='text-white px-1'>Grok 3 is here . </p>
        <p className='text-gray-600 px-1'>Try our new Features : DeepSearch, Think and Edit images</p>

        <div className='flex flex-col lg:flex-row gap-4 mt-5 text-sm '>

          <div className='bg-gray-700 rounded-md px-3 py-3 '>
            <span className='inline-block '>
              <span className='flex gap-2  items-center border-1 px-1 bg-gray-800 rounded-lg '>

              <SiDeepin />
              Deep Search
              </span>

            </span>


            <p className='mt-1'>
              Search deeply to deliver detailed, well-reasoned answers with Grok’s rapid, agentic search.
            </p>
          </div>
             <div className='bg-gray-700 rounded-md px-3 py-3 '>
            <span className='inline-block '>
              <span className='flex gap-2  items-center border-1 px-1 bg-gray-800 rounded-lg '>

              <SiDeepin />
              Deep Search
              </span>

            </span>


            <p className='mt-1'>
              Search deeply to deliver detailed, well-reasoned answers with Grok’s rapid, agentic search.
            </p>
          </div>
            <div className='bg-gray-700 rounded-md px-3 py-3 '>
            <span className='inline-block '>
              <span className='flex gap-2  items-center border-1 px-1 bg-gray-800 rounded-lg '>

              <SiDeepin />
              Deep Search
              </span>

            </span>


            <p className='mt-1'>
              Search deeply to deliver detailed, well-reasoned answers with Grok’s rapid, agentic search.
            </p>
          </div>


        </div>


      </div>






    </div>
  )
}

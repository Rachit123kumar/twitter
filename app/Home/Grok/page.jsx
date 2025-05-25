"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { FaClockRotateLeft } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { SiDeepin } from "react-icons/si";
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { LuLoader } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";


export default function GrOk() {
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState([])
  const [loading,setLoading]=useState(false)


  async function submit() {

    if (!inputVal) {
      alert(" please input the text!")
      return;
    }
    setLoading(true)
    const res = await axios.post("/api/open", {
      input: inputVal
    })
    console.log(res.data)
    const question = inputVal;
    const ans = res.data
    setMessages(prev => ([...prev, { question, ans }]))
    setLoading(false)
    setInputVal("")


  }



  return (
    <div className='text-white max-w-[762px] md:max-w-[700px] mx-auto text-xs md:text-sm'>

      <div className=' flex md:hidden text-white justify-between px-2 py-2 '>
        <div>
          <img className='rounded-full ring-2 ring-blue-400 ' src={'/boy.png'} height={25} width={25} />

        </div>

        <div>
          <p className='text-center top-5 '>
            Grok3
            </p>

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

      {/* <div className='max-w-[762px] md:max-w-[700px] mt-5 text-white flex mx-auto pb-2  gap-2  justify-center bg-gray-700 rounded-full px-2 py-2 items-center'>
        <div>
          <img className='rounded-full ring-2 ring-blue-400 ' src={'/boy.png'} height={40} width={40} />

        </div>
        <div>
          <p className='font-bold text-xs' >
            Draw me

          </p>
          <p className='text-gray-400'>Click here to try a random style </p>
        </div>


      </div> */}

      <div className='text-white mt-3 text-center '>
        <p className='text-white px-1 text-sm'>Grok 3 is here . </p>
        <p className='text-gray-600 px-1'>Try our new Features : DeepSearch, Think and Edit images</p>

        {/* <div className='flex flex-col lg:flex-row gap-4 mt-5 text-xs '>

          <div className='bg-gray-700 rounded-md px-3 py-3 text-xs'>
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


        </div> */}


      </div>



      <div className=''>
        {
          messages.map((el, i) => <div key={i} className='flex flex-col  mb-5'>
            <p className=' py-2 px-1 mt-3 text-gray-500 rounded-md justify-self-end w-[90%]'>Quest:{el.question}</p>
            <div className='mt-3 py-2 text-gray-500 text-sm px-1 prose prose-zinc  dark:prose-invert w-[700px]'>
              <ReactMarkdown

                remarkPlugins={[remarkGfm]}
              >
                {el.ans}
              </ReactMarkdown>

            </div>
          </div>)
        }
      </div>




     <div className='sticky  bottom-3 left-0 right-0 px-4 flex items-center justify-center'>
  <div className='flex w-full max-w-full items-center gap-2 bg-gray-900 px-3 py-2 rounded-full border border-gray-700'>
    <input
      className='flex-1 bg-transparent text-white px-2 outline-none placeholder-gray-400'
      disabled={loading}
      value={inputVal}
      onChange={(e) => setInputVal(e.target.value)}
      placeholder='Ask something...'
    />
    <button
      className='bg-gray-300 px-3 py-1 rounded-full text-black font-bold disabled:opacity-50'
      disabled={loading}
      onClick={() => submit()}
    >
      {loading ? (
        <LuLoader className='animate-spin' />
      ) : (
        <FaArrowUp />
      )}
    </button>
  </div>
</div>






    </div>
  )
}

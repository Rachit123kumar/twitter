import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import { AiFillDelete } from "react-icons/ai";
import PollLength from './PollLwngth';
export default function Poll({ setPostType,Question,setQuestion,option,setOptions,min ,setMins, hour, setHour, days, setDays}) {



  const Days = Array.from({ length: 7 }, (_, i) => i + 1);
  const Hours = Array.from({ length: 23 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 59 }, (_, i) => i + 1);



  function addOption() {
    if (option.length < 4) {
      setOptions(p => [...p, ''])
      // console.log(option)
      // options not changed why?
    }

  }
  function removeOption(indexToremove) {
    if (option.length > 2) {

      setOptions(p => p.filter((_, i) => i != indexToremove))
      // console.log(option)
      // options not changed why?
    }

  }

  function handleChange(index, value) {
    const updated = [...option];
    updated[index] = value;
    setOptions(updated)
    // console.log(updated)

  }



  return (
    <div className='flex flex-col gap-2.5 '>

      <textarea placeholder='Ask Question' maxLength={50} value={Question} onChange={(e)=>setQuestion(e.target.value)} className='border-none outline-none resize-none text-white font-sans pt-1' />



      {
        option.map((el, i) => <div key={i} className='flex gap-0.5 md:gap-3'>
          <input type="text" value={el} onChange={(e) => handleChange(i, e.target.value)} placeholder='option ' className='border-1 w-[80%] border-gray-300 px-4 py-2 text-white bg-black' />
          {i > 1 && <button onClick={() => removeOption(i)} className='bg-red-400 px-4 flex items-center gap-2 rounded-lg text-white '><AiFillDelete className='fill-black' /><span className='hidden md:block'>Delete </span>   </button>}

          {
            option.length - 1 == i && <button onClick={addOption} className={`px-4 flex items-center gap-2 text-white ${i===3?"hidden":"block" }`}><FaPlus /><span className='hidden md:block'>Add</span></button>
          }

        </div>)
      }

      <div className=''>
        <p className='text-white font-sans '>Poll Length </p>
        <div className='flex gap-3 mb-3 mt-2'>

          <div className='pt-0.5 bg-white rounded-md'>

            <PollLength Arra={Days} title={"Days"}  varm={days} setVar={setDays}/>
          </div>
          <div className='pt-0.5 bg-white rounded-md'>

            <PollLength Arra={Hours} title={"hous"}   varm={hour} setVar={setHour}/>
          </div>
          <div className='pt-0.5 bg-white rounded-md hidden md:block' >

            <PollLength Arra={minutes} title={"minutes"} varm={min} setVar={setMins}/>
          </div>
        </div>

      </div>

      <div className='mb-2'>
        <button className='max-w-[400px] px-3 py-4 text-red-300 border-1 border-gray-300 rounded-lg flex gap-2 items-center justify-center' onClick={() => setPostType('image')}>
          Remove poll
          <AiFillDelete />

        </button>
      </div>

    </div>
  )
}

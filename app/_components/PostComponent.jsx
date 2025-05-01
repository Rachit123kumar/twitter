"use client"
import React, { useEffect, useRef, useState } from 'react'
import { MdImage } from "react-icons/md";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { FaBrain } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import ImojiPickerBackground from './ImojiPickerBackground';
import ImagePreview from './ImagePreview';
import Poll from './Poll';
import { useSession } from 'next-auth/react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PostComponent() {
  const [picker, setPicker] = useState(false);
  const textRef = useRef()

  const router=useRouter()

  const [text, setText] = useState('')
  const [cursorPosition, setCursorPositon] = useState('')
  const [images, setImages] = useState([])
  const imageInputRef = useRef()
  const [postType, setPostType] = useState('image');

  // for Poll 
  const [Question,setQuestion]=useState('');

  const [option, setOptions] = useState([
    '', ''

  ])

  const {data,status}=useSession();


useEffect(()=>{
  if(status=='unauthenticated'){
    router.push('/auth/signin')
  }

},[status])
  




  // if postType is poll submit the question and option 
  // it tweetType is media submit the text and the images



  async function submitPost(){

    if(postType==='poll'){

      if(!Question){
        alert("No question please type question")
      }
    

      const opt=[];
      option.forEach((el,i)=>{
        if(el.length>0){
          opt.push(el)
        }
      })
      console.log(opt)

      const res=await axios.post('/api/post',{
      email:"12arabittu@gmail.com",
      question:Question,
      option:option
      

      })
      console.log(res)







    }
  }



  if(status=="loading"){
    return <div className='flex items-center justify-center h-10'>
      <AiOutlineLoading3Quarters className='animate-spin text-white font-bold size-5'/>
      </div>

  }




  return (
    <div className='flex flex-col text-white mt-2'>
      <div className='flex gap-x-3'>

        <img src={"/my.png"} className='h-10 w-10 rounded-full' />
        <div className='text-blue-500 flex-grow'>
          {postType == 'image' &&
          <>
          <textarea ref={textRef} type="text" value={text} onChange={(e) => { setText(e.target.value) }} placeholder='What is happening?' className='text-white resize-none w-full border-none outline-none py-2 text-xl flex-grow' />
          
          
          <ImagePreview imageInputRef={imageInputRef} images={images} setImages={setImages} /> 
          </>
          }

          {
            postType =='poll' && <Poll setPostType={setPostType} Question={Question} setQuestion={setQuestion} option={option} setOptions={setOptions}/>
          }


        </div>
      </div>
      <div className='flex justify-between border-t-1 border-b-1 border-gray-400'>



        <div className='flex items-center justify-center  gap-x-3 border-white mt-2 '>

          <button  disabled={postType=='poll'} className=''  onClick={() => {
            setPostType('image')
            imageInputRef.current.click()
            return;

          }

          }><span><MdImage className={` cursor-pointer ${postType=='poll' ? 'fill-blue-200 cursor-none': "fill-blue-500"} ` }/></span></button>


          <button><span><FaSquarePollHorizontal className='fill-blue-500 cursor-pointer' onClick={() => {
            setPostType('poll')
          }} /></span></button>


          <button><span><FaBrain className='fill-blue-500 cursor-pointer' /></span></button>


          <div className='relative'>

            <button onClick={() => setPicker(picker => !picker)}><span><MdEmojiEmotions className='fill-blue-500 cursor-pointer' /></span></button>


            {picker && <div className='absolute top-10 left-0' onMouseLeave={() => { setPicker(false) }}>


              <ImojiPickerBackground textRef={textRef} text={text} setCursorPositon={setCursorPositon} setText={setText} cursorPosition={cursorPosition} />
            </div>

            }
          </div>
          <button>
            <img src={'/icons/colorful.png'} className='h-12 w-12 object-cover' />
          </button>

        </div>

        <div>

          <button className='px-4 py-2 bg-white text-black rounded-full' onClick={submitPost}>Post</button>

        </div>
      </div>


    </div>
  )
}

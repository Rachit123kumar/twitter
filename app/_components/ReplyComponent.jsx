import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'

import { AiOutlineLoading } from 'react-icons/ai'
import { HiMiniGif } from "react-icons/hi2";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import { FaIoxhost } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

import ImageSliderReply from './ImageSliderReply';
import axios from 'axios';



export default function ReplyComponent({author,tweetId}) {
    const [user,setUser]=useState(null)
    const fileRef=useRef()
    const [text,setText]=useState("")
    const [images,setImages]=useState([]);
    const [loading,setLoading]=useState(false)


  
    const {status, data}=useSession()


    function handleFileChange(e){
    

        const files=Array.from(e.target.files);
        console.log(files || "nothing")


        files.map(((media)=>{
            const reader=new FileReader();
            reader.readAsDataURL(media);
            reader.onload=(readerEvent)=>{
                const fileType=media.type.startsWith("video")? "video" :"image"
                setImages(prev=>[...prev, {
                    type:fileType,
                    url:readerEvent.target.result

                }])

            }


            
        }))
    
    }



 async   function handleReply(){
        if(!text)return;
setLoading(true)
        const res=await axios.post('/api/giveReply',{
            email:data.user.email,
            tweetId,
            content:text
        })
        console.log(res.data)
setLoading(false)



    }


    useEffect(()=>{
        if(status==="authenticated" && data){
            console.log(data)
            setUser(data)
        }

    },[status,data])









    if(status==="unauthenticated"){
        return <div>
            <p className='text-white text-sm '> please login to reply </p>
        </div>
    }
    if(status==="loading"){
        return<div className='flex h-10 w-full items-center justify-center'>
            <AiOutlineLoading className=' animate-spin '/>
        </div>
    }



  if(status=="authenticated" )return (
    <div className='w-full text-white '>


        
        
        
        
        <div className='mt-3'>
            <p className='text-gray-300 text-xs font-extralight pl-3'>Replying to <span className='text-blue-300 underline cursor-pointer'>@{author?.email}</span>  </p>
            <div className=' rounded-full flex items-center mt-1'>
                <img src={user?.user?.image} alt="profile image " height={30} width={30} className='rounded-full object-contain '/>
                <input type="text" placeholder='Post your reply ' value={text} onChange={(e)=>setText(e.target.value)} className='text-white text-sm flex-grow px-3 py-2 border-none outline-none' />

            </div>

            <div>
                {
                    images.length >0 && <ImageSliderReply images={images}/>
                }
            </div>




            <div className='flex justify-between'>

            <div className='flex items-center gap-2 justify-between mt-4'>
                <div>
                    <span onClick={()=>fileRef.current.click()} className=''><BsFileEarmarkArrowUpFill className='fill-blue-400 size-4'/></span>
                </div>
                <div>
                    <span className=''><HiMiniGif className='fill-blue-400 size-4'/></span>
                </div>
                <div>
                    <span className=''><FaIoxhost className='fill-blue-400 size-4'/></span>
                </div>
                <div>
                    <span className=''><MdEmojiEmotions className='fill-blue-400 size-4'/></span>
                </div>
                <div>
                    <span className=''><FaLocationDot className='fill-blue-400 size-4'/></span>
                </div>

            </div>
            <div>

            </div>
            </div>
            <div className='flex justify-end mt-2'>
                <button className='text-black bg-white px-3 text-sm py-1 text-center rounded-full' onClick={handleReply} disabled={loading}>{loading ? "loading":"Reply"}</button>
            </div>
            <input type="file" ref={fileRef} hidden multiple onChange={handleFileChange} />

        </div>
        
        
        
        </div>
  )
}

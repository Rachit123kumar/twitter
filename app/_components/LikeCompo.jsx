
import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { BiRepost } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { PiUploadSimple } from "react-icons/pi";
import { LiaPollSolid } from "react-icons/lia";
import { useUser } from './Providers';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function LikeCompo({tweetId, likeCount, commentCount,isLikedByMe,user=null}) {
    const [isliked,setLiked]=useState(isLikedByMe)
    const [numCount,setLikeCount]=useState(likeCount)
    const router=useRouter()




    async function like(){
        console.log(user)
        if(isliked || !user){

            // delete the like 

            // unlike 
            return
        }
        console.log(tweetId, user.email)
        setLiked(true)

        const res=await axios.post('/api/like',{
            email:user.email,
            tweetId:tweetId

        })
        console.log(res.data)
        setLikeCount((num)=>num+1)


    }






    return (
        <div className='w-full flex pl-4 mb-3 justify-center items-center gap-4 mt-3 '>
            <div className='flex-grow flex items-center  gap-4 justify-between'>


            <div className={`hover:bg-red-500 transition duration-700 px-1 py-1 rounded-full flex items-center  gap-2`} onClick={()=>like()}>
{
    isliked ? 
<span className='cursor-pointer'><FaHeart className={`fill-red-500 '}`}/></span>:
<span className='cursor-pointer'><FaRegHeart /></span>
}
<span className='text-white text-xs'>{numCount || ""}</span>

            </div>
            <div className='cursor-pointer' onClick={()=>router.push(`/Home/post/${tweetId}`)}>
                <span className='text-white flex items-center text-sm gap-2'><MdOutlineModeComment /> {commentCount || ""}</span>
            </div>
            <div className='cursor-pointer'>
                <span><BiRepost /></span>
            </div>
            <div className='cursor-pointer'>
                <span><LiaPollSolid /></span>
            </div>
            <div className='flex gap-2 '>
                <span className='cursor-pointer'><CiBookmark /></span>
                <span className='cursor-pointer'><PiUploadSimple /></span>
            </div>
          

                </div>
        </div>
    )
}

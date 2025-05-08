import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { BiRepost } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { PiUploadSimple } from "react-icons/pi";
import { LiaPollSolid } from "react-icons/lia";
import { useUser } from './Providers';
export default function LikeCompo({tweetId, liked}) {

const {user}=useUser()
console.log(user)

    async function like(){
        if(liked){
            return
        }


    }






    return (
        <div className='w-full flex pl-4 mb-3 justify-center items-center gap-4 mt-3 '>
            <div className='flex-grow flex items-center  gap-4 justify-between'>


            <div className='hover:bg-red-500 transition duration-700 px-1 py-1 rounded-full'>
                <span><FaRegHeart /></span>
            </div>
            <div>
                <span><MdOutlineModeComment /></span>
            </div>
            <div>
                <span><BiRepost /></span>
            </div>
            <div>
                <span><LiaPollSolid /></span>
            </div>
            <div className='flex gap-2 '>
                <span><CiBookmark /></span>
                <span><PiUploadSimple /></span>
            </div>
          

                </div>
        </div>
    )
}

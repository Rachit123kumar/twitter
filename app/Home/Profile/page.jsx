"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import ShowPost from '../../_components/ShowPost';
import PostSHow from '../../_components/postSHow';
import axios from 'axios';

export default function Profile() {
  const { status, data } = useSession()
  const [loading,setLoading]=useState(false)
  const [tweets,setTweets]=useState([])
  const router = useRouter()


  useEffect(() => {


    if (status === "unauthenticated") {
      router.push('/auth/signin')
    }
    console.log(data)

    if(status=="loading"){
      return
    }
    async function etData(){
setLoading(true)
      const res=await fetch(`/api/myposts?email=${data.user.email}`)
     const ans=await res.json()
     console.log(ans)
     setTweets(ans)
     setLoading(false)
    }
etData()






  }, [status])


  if (status === "loading") {
    return <div className=' h-[100vh] flex  items-center justify-center'>

      <RiTwitterXFill className='text-white animate-pulse  ' size={50} />

    </div>
  }



  return (
    <div className='text-white '>


      <div className='px-2 py-2 flex gap-3 items-center '>
        <div className='cursor-pointer' onClick={() => router.push('/Home')}>
          <span><FaArrowLeft /> </span>
        </div>

        <nav className='font-bold '>
          {data.user?.name}
          <p className="text-gray-600 font-sans font-light ">{tweets.length || "loading"}posts</p>
        </nav>
      </div>

      <div className='max-w-[700px] relative'>
        <div className=' overflow-hidden h-[200px]'>
          <img src={'/background1.jpg'} className='object-contain h-auto w-auto cursor-pointer' alt={"background image "} />


        </div>


        <div className='absolute  bottom-[-30px] md:bottom-[-45px] left-5 h-[60px] w-[60px] md:h-[120px] md:w-[120px] rounded-full ring-2 ring-white overflow-hidden'>
          <img src={data.user.image || '/profile3.jpg'} className=' object-contain cursor-pointer ' alt="profile pic" />

        </div>

      </div>

      <div className='flex justify-end '>
        <button className='px-3 py-1 border-1  border-gray-500 rounded-full font-sans font-bold mt-2 cursor-pointer '>Edit profile </button>
      </div>

      <div className='mt-5 py-1 px-3 flex gap-2 items-center    '>
        <p className='font-sans font-bold '>{data.user.name}</p>
        <button className='flex items-center gap-2 border-1 px-2 py-1 rounded-full border-gray-300 '>
          <RiVerifiedBadgeFill className='fill-blue-500 ' />
          <span className='text-white font-bold font-sans text-sm  cursor-pointer'>Get Verified</span>
        </button>
      </div>
      <div>

        <p className='text-gray-400 px-3 text-sm mt-[-1px] '>
          <span>@</span>{data.user.username || "username"}</p>


          <p className='font-light px-3 '>React JS || Mongo|| Next Js || EC2 || Javascript</p>

      </div>
      {!loading && <PostSHow tweets={tweets} data={data} />}
        {
        !loading && tweets.length==0 && <div className='text-white text-center '>
          No post to show 
        </div>
      }


    





    </div>
    
  )
}

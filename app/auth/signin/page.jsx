"use client"
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai';
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FcGoogle } from "react-icons/fc";
export default function Page() {


const {data,status}=useSession();
const router=useRouter();



useEffect(()=>{

  if(status==="authenticated"){
    router.push('/Home')

  }
},[status])






  useEffect(()=>{

    async function fetchData(){
      const res=await getProviders();
      console.log(res)
    }
    fetchData()


  },[])


  if(status=="loading"){
    return <div className='h-[100vh] flex items-center justify-center'>
      <AiOutlineLoading className='text-white animate-spin h-20'/>

    </div>
  }

  return (
    <div className='text-white flex h-[100vh] max-w-[1200px] mx-auto items-center justify-center px-4 md:px-8 lg:px-20'>



      <div className='flex items-center justify-center  md:justify-between  w-full px-4'>


        <div className='hidden md:block'>

          <FaTwitter className='size-30 animate-pulse' />
        </div>
        <div className='flex flex-col gap-y-4 items-center justify-center'>

          <div className='md:hidden'>
            <span><FaTwitter className='size-15' /></span>

          </div>


          <div>

            <p className='text-5xl text-white font-bold font-sans'>Happening Now</p>
            <p className='text-white font-semibold mt-4 mb-6'>Join Today.</p>
          </div>

          <div className='flex items-center justify-center'>
            <button className='px-6 py-2 cursor-pointer flex items-center bg-white text-black justify-center rounded-full gap-1 w-[300px]'onClick={()=>signIn('google')}>


              <span>signup with </span>
              <span><FcGoogle /></span>
            </button>
          </div>
          <div className='flex items-center justify-center'>
            <button className='px-6 py-2 cursor-pointer flex items-center bg-white text-black justify-center rounded-full gap-1 w-[300px]' onClick={()=>signIn('github')}>


              <span>signup with </span>
              <span><FaGithub /></span>
            </button>
          </div>
          <div className='flex w-[300px] items-center justify-center gap-2 mx-3'>
            <hr className='border-white  flex-1 flex-grow' />
            <p>or</p>
            <hr className='border-gray-300  flex-grow' />

          </div>
          <div>
            <button className='px-6 bg-blue-500 text-white text-center py-2 rounded-full text-sm cursor-pointer font-sans w-[300px] '>
              create new account
            </button>
          </div>
          <div>
            <p className='text-xs text-gray-500'>By signing up, you agree to the  <span className='text-blue-400'>Terms of service</span> and <span className='text-blue-400'>provicy policy</span>, <span>including cookie use</span></p>
          </div>

          <div className='mt-6'>
            <p className='mb-4'>Already have an account?</p>
            <button className='px-20 cursor-pointer font-sans py-2 text-blue-400 text-center rounded-full border-gray-300 border-1'>signin </button>
          </div>


        </div>

      </div>



    </div>
  )
}




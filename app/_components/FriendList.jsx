"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import profile from "../../public/profile1.jpg"
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import TypingAnimation from './TypingAnimation';

export const PORT="https://watsappbackend.learngames.shop"
// export const PORT="http://localhost:3005"

const friends = [


  {
    name: "Adda",
    profilePic: "../../public/profile1.jpg",
    lastMesage: "hello Bhai",
    time: "16:55",
    status: "sent"
  },


]




export default function FriendList({setSelectedUser ,socket,usersTyping}) {

 const [userOnline,setUserOnline]=useState(null)
console.log(socket,"socket from FriendList")


const {data:{user},status}=useSession()
const [friends,setFriends]=useState([])


useEffect(()=>{
// console.log(" I am from friendList")
  if(!socket){
    return
  }


  const handleSocketMessage=(event)=>{
    console.log(event.data)
    const data=JSON.parse(event.data)

    if(data.type=="userOnline"){
      console.log(data.user);
      setUserOnline(data.user)
    }


  }
  socket.addEventListener('message', handleSocketMessage);
  return () => {
    socket.removeEventListener('message', handleSocketMessage);
  };

},[socket])






  useEffect(() => {

    async function getUser() {
      if (!user) {
   
        return
      }

      // const response = await fetch(`https://watsappbackend.learngames.shop/user/all?userId=${user.id}`);
      const response = await fetch(`http://localhost:3005/user/all?userId=${user.id}`);
      const data = await response.json();
      setFriends(data)
      // console.log(friends.data, "from FriendList")
    }
    getUser()
  }, [status])

  if(!socket){
    return <p>Loading..</p>
  }
  

  return (
    <div className='friend-scroll scroll-smooth bg-gray-100 px-3 py-2 flex flex-col space-y-4 max-h-[70vh] overflow-y-auto rounded-md mb-2 ml-2 shadow-2xl'>

      {
        friends.map((el, i) => <div key={i} className='text-black bg-gray-200 px-3 cursor-pointer ' onClick={()=>setSelectedUser(el)}>
          <div className='flex gap-2 px-3 py-2'>
            <div className='flex items-center'>


              {
                el.profieImage ?
                  <Image className=' rounded-full object-cover  ring-2 ring-blue-500' height={40} width={40} alt={"profile Image"} src={profile} /> :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 ring-2 ring-blue-400 rounded-full">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                  </svg>


              }
            </div>
            <div className='flex justify-between w-full'>
              <div>
                <p>{el.fullName}</p>
                <p>{userOnline?.includes(el._id)?"online":"offline"}  </p>
                {usersTyping.includes(el._id) && <TypingAnimation/>}
                {/* <p>{el.lastMesage}</p> */}
              </div>
              <div className=''>
                {/* <p>{el.time}</p> */}
                {/* <p>{el.status == "seen" ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>

                }</p> */}
              </div>
            </div>


          </div>

        </div>)
      }
    </div>
  )
}

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import boy from "../../public/boy.png"
import chatBook from "../../public/chatBook.png"
import { FaMessage } from "react-icons/fa6";
import MessageCompo from './MessageCompo'
import axios from 'axios';
import { getUserMessage, useMessages } from '../_features/utils/helper';
import { toast } from 'react-toastify';
// import { use } from 'react';
const chatOptions = ["delete", "clear chat", "block", "mute"]


// const messages1 = [
//   {
//     message: "hello how are you",
//     sendBy: "me",
//     time: "6th oct 2024"
//   },


// ]



export const URL = 'http://localhost:3001'

export default function SelectedChat({ selectedUser, user,socket }) {

  const [openChatOption, setChatOption] = useState(false);
  // console.log(selectedUser,"selected user")

  // const [messages, setMessages] = useState(null);









  // useEffect(()=>{
  //   if(!user || !selectedUser){
  //     return
  //   }

  //   async function getMessages(){

  // const res=await getUserMessage(user.id,selectedUser._id)
  //   setMessages(res.data)

  //   }
  //   getMessages()
  // },[user,selectedUser])



  if (!selectedUser) {
    return (<div className='flex items-center flex-col bg-green-500 justify-center h-full'>
      <FaMessage className='size-20 animate-bounce ' />
      <p>please select a user to chat</p>


    </div>)
  }

  if (selectedUser) return <div className='bg-green-500 h-full w-full'>
    <div className='flex justify-between items-center  bg-amber-800'>



      <div className='flex items-center gap-3 px-3 py-1 rounded-md '>
        <Image height={50} width={"auto"} src={boy} alt="boy Image" className='ring-2 ring-blue-500 rounded-full ' />
        <p className='font-sans'>{selectedUser.fullName}</p>
      </div>
      <div className='flex items-center gap-3'>
        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        </span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

        </span>
        <div className='relative'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => setChatOption(true)} className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
          {openChatOption && <div className='absolute top-2 right-3 bg-gray-300 flex flex-col justify-center rounded-md' onMouseLeave={() => setChatOption(false)}>
            {
              chatOptions.map((el, i) => <p key={i} className='px-3 text-left py-1 hover:bg-gray-100 rounded-md cursor-pointer text-black w-[150px]'>{el}</p>)
            }

          </div>}



        </div>
      </div>

    </div>{
    
      <MessageCompo user={user}  selectedUser={selectedUser} socket={socket}/>
    }
  </div>





}

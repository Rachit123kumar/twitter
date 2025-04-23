"use client"
import { Button } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import FriendList from '../_components/FriendList'
import SelectedChat from '../_components/SelectedChat'
import SearchComponent from '../_components/SearchComponent'
import Image from 'next/image'
import accountImage from "@/public/profile1.jpg"
import { useSession } from 'next-auth/react'
import { useSelector } from "react-redux"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'




export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(null)
  const router = useRouter()

  const { data, status } = useSession();


  const [openMo, setOpenMo] = useState(false)
  const [newContact, setNewContact] = useState(false);
  // console.log(data?.user, "user from useSession")
  const [socket,setSocket]=useState(null);
  const [usersTyping,setUserTyping]=useState([])

  // messages to show to the unseen messages 
  // typing indicator while other user is chatting 
 




  useEffect(()=>{

    console.log("effect runs")
    if( status=="unauthenticated" || status=="loading"){
      return
    }

    // const wss=new WebSocket(`ws://localhost:3005/?userId=${data.user.id}`)
    const wss=new WebSocket(`wss://watsappbackend.learngames.shop/?userId=${data.user.id}`)

    wss.onopen=()=>{
      console.log('connecction established')
    }
    wss.onmessage=(message)=>{
      try{
        const data=JSON.parse(message.data)

        if(data.type=="private"){
          // toast.error("private message has been came")
          if(!selectedUser || data.senderId!=selectedUser._id){
            toast.success("A user has send you a message ")
          }
        }
        if(data.type=="typing"){
          if(data.isTyping){

            if(!usersTyping.includes(data.senderId)){
              
              setUserTyping(prev=>[...prev,data.senderId])
            }
          }else{
            setUserTyping(prev=>prev.filter((i)=>i!=data.senderId))
          }
        }


        console.log('message->',data) 
      }catch(err){
        console.log(err)
      }
      
      // setUserOnline(data)

      // if(message.type=="onlineUser"){
      //   setUserOnline(data)
      // }




    }
    setSocket(wss)
    return () =>{
      console.log("effect return")
      if(wss.readyState===WebSocket.OPEN || wss.readyState ===WebSocket.CONNECTING)
      wss.close()
    }


  },[status])






  if (status == "loading") {
    return <div className='flex items-center justify-center h-[90vh]'>
      <AiOutlineLoading3Quarters className='size-10 animate-spin ' />

    </div>
  }


  return (
    <div className='  px-3 mt-2'>

      <div className='grid grid-cols-10 gap-x-3 bg-blue-400   rounded-xl shadow-lg '>

        <div className='col-span-2 pt-3 relative h-full'>
          <div className=''>
            <div className='flex justify-between '>

              <p className='text-xl font-bold text-white  ml-6 '>Chat</p>

              <p className='flex justify-between gap-3 '>
                <span className='cursor-pointer' onClick={() => setNewContact(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                    <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                  </svg>

                </span>
                <span className='relative' onClick={() => setOpenMo(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                    <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                  </svg>


                  <button className={`absolute top-7  right-0 z-100 text-sm animate-popIn rounded-md min-w-[200px] text-black py-1 bg-gray-200 ${openMo ? "block" : "hidden"}`} onMouseLeave={() => setOpenMo(false)}>
                    <nav className='bg-gray-100 hover:bg-gray-300  px-3 text-left py-2'>
                      Logout
                    </nav>
                    <nav className='bg-gray-100 hover:bg-gray-300 px-3  text-left py-2 w-full '>
                      Stared Messages
                    </nav>
                    <nav className='bg-gray-100 hover:bg-gray-300  px-3 text-left py-2 border-b-2 border-red-300'>
                      New Group
                    </nav>
                    <nav className='bg-gray-100 hover:bg-gray-300  px-3 text-left py-2 mb-1 '>
                      Support
                    </nav>


                  </button>
                </span>
              </p>




            </div>
            <SearchComponent />

            <div className='flex gap-3 items-start ml-5 mt-4 mb-4'>

              <Button>All</Button>
              <Button disabled>unread</Button>
              <Button>Favourite</Button>
              {/* <Button>Groups</Button> */}
            </div>

            <div className=''>


              <FriendList setSelectedUser={setSelectedUser}  socket={socket} usersTyping={usersTyping}/>
              {
                newContact &&
                <div className={`absolute top-0 left-0 min-w-[480px] bg-gray-900 h-full pt-1  rounded-xl`}>
                  <div className='flex  gap-2 items-center px-3'>

                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setNewContact(false)} viewBox="0 0 24 24" fill="currentColor" className={`size-6 cursor-pointer `}>
                      <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                    <input type="text" placeholder="seach email or name  " className='px-3 w-full py-2 rounded-md bg-gray-400' />

                  </div>
                  <div className='flex flex-col mt-3 gap-y-3 h-[90%] overflow-y-auto search-scroll'>






                    <div className='flex py-3 pl-3 bg-gray-100 text-black mx-3 rounded-md cursor-pointer'>
                      <Image height={20} width={"auto"} className='rounded-full ring-2 ring-blue-400' alt="profile Image" src={accountImage} />
                      <div className='pl-5'>

                        <p>Name</p>
                        <p>hellobittukumar12@gmail.com</p>
                      </div>
                    </div>



                  </div>
                </div>

              }

            </div>




          </div>

        </div>
        <div className='col-span-8 '>

          <SelectedChat selectedUser={selectedUser} user={data.user} socket={socket} />
        </div>



      </div>
    </div>

  )
}

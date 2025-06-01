"use client"
import React, { useEffect, useState, useRef } from 'react'
import PostComponent from '../_components/PostComponent'
import ShowPost from "../_components/ShowPost"
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa"
import { IoNotifications } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { GiPirateCaptain } from "react-icons/gi";
import { AiFillCreditCard, AiFillThunderbolt } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import CreatePostButton from "../_components/createPostButton"
import SmallScreenTopNav from '../_components/smallScreenTopNav';

const options = [
  { name: "Home", icons: <IoMdHome className='fill-white size-4'/>, link: "/Home" },
  { name: "Explore", icons: <FaSearch className='fill-white size-4'/>, link: "/Home/Explore" },
  // { name: "Notifications", icons: <IoNotifications />, link: "/Home/notification" },
  { name: "Grok", icons: <GiPirateCaptain className='fill-white size-4'/>, link: "/Home/Grok" },
  { name: "Communities", icons: <MdPeopleAlt className='fill-white size-4'/>, link: "/Home/Communities" },
  // { name: "Premium", icons: <AiFillCreditCard className='fill-white'/>, link: "/Home/Premium" },
  // { name: "Verified Orgs", icons: <AiFillThunderbolt className='fill-white size-4'/>, link: "/Home/Verified" },
  { name: "Profile", icons: <FaUserAlt className='fill-white size-4' />, link: "/Home/Profile" }
]


export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [showMenu, setShowMenu] = useState(true)
  const lastScrollY = useRef(0)
  const router = useRouter()

  // 🧠 Track screen width safely
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768)
    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  // 🧠 Scroll event only when mobile
  useEffect(() => {
    if (!isMobile) return // Skip scroll logic if not mobile

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (Math.abs(currentScrollY - lastScrollY.current) < 20) return
      setShowMenu(currentScrollY < lastScrollY.current)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <div className='px-1    md:border-l md:border-r border-white'>
      <div  className="hidden md:block">

      <PostComponent/>
      </div>
      <div className='block md:hidden border-b border-gray-400  mb-2 pb-1'>
        {/* <CreatePostButton/> */}
        <SmallScreenTopNav/>

      </div>



      <ShowPost />

      {isMobile && (
        <div className='flex items-center justify-center'>
          <div
            className={`fixed bottom-0 border-t-1 border-gray-800 h-10 w-[100vw] shadow-md flex justify-between mx-auto bg-black  z-10 px-2 py-2 text-black transition-opacity duration-300 ${
              showMenu ? 'block' : 'hidden'
            }`}
          >
            {options.map((el, i) => (
              <div key={i}>
                <p
                  className='hover:bg-white duration-150 ease-in-out px-1 py-1 rounded-full cursor-pointer'
                  onClick={() => router.push(el.link)}
                >
                  {el.icons}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

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

const options = [
  { name: "Home", icons: <IoMdHome />, link: "/Home" },
  { name: "Explore", icons: <FaSearch />, link: "/Home/Explore" },
  { name: "Notifications", icons: <IoNotifications />, link: "/Home/notification" },
  { name: "Grok", icons: <GiPirateCaptain />, link: "/Home/Grok" },
  { name: "Communities", icons: <MdPeopleAlt />, link: "/Home/Communities" },
  { name: "Premium", icons: <AiFillCreditCard />, link: "/Home/Premium" },
  { name: "Verified Orgs", icons: <AiFillThunderbolt />, link: "/Home/Verified" },
  { name: "Profile", icons: <FaUserAlt />, link: "/Home/Profile" }
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
    <div className='px-1 border-l border-r border-white'>
      <PostComponent />
      <ShowPost />

      {isMobile && (
        <div className='flex items-center justify-center'>
          <div
            className={`fixed bottom-1 h-10 w-[90vw] flex justify-between mx-auto bg-gray-300 rounded-full z-10 px-2 py-2 text-black transition-opacity duration-300 ${
              showMenu ? 'opacity-100' : 'opacity-0'
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

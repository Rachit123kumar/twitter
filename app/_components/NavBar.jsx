"use client"

import React, { useEffect, useState } from 'react'
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa"
import { IoNotifications } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { GiPirateCaptain } from "react-icons/gi";
import { AiFillCreditCard } from "react-icons/ai";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { IoLogOut } from "react-icons/io5";
import { signOut } from 'next-auth/react';




export default function NavBar() {

    const options = [{
        name: "Home",
        icons: <IoMdHome />,
        link: "/Home"

    }, {
        name: "Explore",
        icons: <FaSearch />,
        link: "/Home/Explore"
    },
    {
        name: "Notifications",
        icons: <IoNotifications />,
        link: "/Home/notification"
    },
    {
        name: "Grok",
        icons: <GiPirateCaptain />,
        link: "/Home/Grok"

    }, {
        name: "Communities",
        icons: <MdPeopleAlt />,
        link: "/Home/Communities"
    }, {
        name: "Premium",
        icons: <AiFillCreditCard />,
        link: "/Home/Premium"
    }
        , {
        name: "Verified Orgs",
        icons: <AiFillThunderbolt />,
        link: "/Home/Verified"
    }
        , {
        name: "Profile",
        icons: <FaUserAlt />,
        link: "/Home/Profile"
    }



    ]
    const router = useRouter()


    const [active, setActive] = useState(false)
    const [openNav, setOpenNav] = useState(false)








    return (



        <div className={`flex sticky top-0 left-0 h-[98vh] bg-black flex-col  gap-y-7 mt-2 px-3 border-r-1 border-white `}>

            <div className={` block md:hidden  `} onClick={() => setOpenNav(prev => !prev)}>
                <img className="h-10 w-10 rounded-full" src="/my.png" alt="Profile Image" />
            </div>



            <div>
                <span className=' hidden  md:block '>
                    <FaXTwitter className='fill-white size-10' />
                </span>

            </div>

            {/* <div className=' hidden  sm:flex flex-col gap-y-7 border-r-3 border-white'> */}


            {
                options.map((el, i) => {
                    return <div className={`hidden sm:flex items-center gap-3  cursor-pointer  text-white  `} key={i} onClick={() => router.push(el.link)}>
                        <span>{el.icons}</span>
                        {<p className='hidden lg:block'>{el.name}</p>}

                    </div>
                })
            }
            {/* </div> */}


            <div>
                <button className='px-10 cursor-pointer rounded-md  py-1   bg-white text-black hidden lg:block'>Post</button>
                <div className=' text-center mt-3 rounded-md bg-white  hidden lg:block cursor-pointer'>
                    <div className='flex items-center justify-center gap-1 py-1 text-center cursor-pointer' onClick={()=>signOut()}>

                        <span>

                            Logout
                        </span>

                        <span>
                            <IoLogOut />
                        </span>

                    </div>


                </div>
            </div>


            {
                openNav &&


                <div className='flex flex-col w-[60%] h-full gap-y-7 border-r-1 border-white'>
                    {openNav && options.map((el, i) => {
                        return <div className={` flex items-center gap-3 cursor-pointer  text-white  text-2xl`} key={i} onClick={() => setActive(el.name)}>
                            <span>{el.icons}</span>
                            {<p className=''>{el.name}</p>}

                        </div>
                    })}

                </div>

            }








        </div>






    )
}

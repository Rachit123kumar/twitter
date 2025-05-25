"use client";

import React, { useRef, useState } from 'react'

import { AiFillPicture } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
export default function Page() {

    const [coverImage, setCoverImage] = useState(null);
    const [backgrundImage, setBackgroundImage] = useState(null)

    const coverImageRef = useRef();
    const backgroundImageRef = useRef();


    function handleChangeCover(e) {
        console.log(e.target.files[0])
        const file = e.target.files[0];
        const reader = new FileReader()
        reader.onload = () => {
            console.log(reader.result, "result")
            setBackgroundImage(reader.result)

        }
        reader.readAsDataURL(file)





    }
    function handleChangeBackground(e) {
        console.log(e.target.files[0])

        const file=e.target.files[0];
        if(!file || !file.type.startsWith("image")){
            alert("please choose image file ")
            return
        }

        const reader=new FileReader();
        reader.onload=()=>{
            setCoverImage(reader.result);
        }
        reader.readAsDataURL(file)


    }










    return (
        <div className='w-full max-w-[700px] '>

            <div className='  h-[180px]  md:h-[300px] max-h-[400px] w-full max-w-full bg-gray-700 flex flex-col items-center justify-center relative overflow-y-hidden'>



                {backgrundImage && <img src={backgrundImage} className='object-cover rounded-md aspect-square' />}

              { !backgrundImage && <p className='text-white text-center flex items-center justify-center gap-2 '>Upload your cover Image

                    <span onClick={() => coverImageRef.current.click()}><FaEdit className='fill-blue-400 size-5 cursor-pointer' /></span>
                </p>}

                <div className='absolute bottom-[1%]'>

                    <span onClick={() => backgroundImageRef.current.click()}>
                   { !coverImage &&    <AiFillPicture className='size-20 ring-2 ring-blue-400 rounded-full p-2 cursor-pointer fill-blue-400' />}
                   {
                    coverImage && <div>
                        <img src={coverImage} className='h-[70px]  md:h-[100px] w-[70px] md:w-[100px] rounded-full ring-2 ring-white p-.5 z-10'/>
                    </div>
                   }

                    </span>
                </div>


            </div>

            <div className='text-white  flex items-center justify-center flex-col space-y-6 mt-8'>
                <input type="file" ref={coverImageRef} hidden accept='image/*' onChange={(e) => handleChangeCover(e)} />
                <input type="file" ref={backgroundImageRef} hidden accept='image/*' onChange={(e) => handleChangeBackground(e)} />



                <div>

                    <p> name of  Page</p>
                    <input type="text" placeholder="John Design" className='border-1 border-gray-600 rounded-full px-4 py-1 text-sm' maxLength={20} />
                </div>
                <div>

                    <p>Bio of the page</p>
                    <input type="text" placeholder="John Design" className='border-1 border-gray-600 rounded-full px-4 py-1 text-sm' maxLength={30} />
                </div>
                <div>

                    <p>Enter category</p>
                    <input type="text" placeholder="e.g. software developement" className='border-1 border-gray-600 rounded-full px-4 py-1 text-sm' maxLength={20} />
                </div>


                <div>
                    <button className='text-center border-1 border-gray-700 px-2 py-1 rounded-full text-sm cursor-pointer'>Create Page</button>
                </div>
            </div>

        </div>

    )
}

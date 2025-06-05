"use client";
import imageCompression from "browser-image-compression"
import SmallScreenTopNav from "./../../_components/smallScreenTopNav"
import { TbLoader3 } from "react-icons/tb";
import { TiTick } from "react-icons/ti";

import React, { useEffect, useRef, useState } from 'react'

import { AiFillPicture } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";
import { useForm } from "react-hook-form";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { MdDoNotDisturb } from "react-icons/md";

export default function Page() {

    const router = useRouter()
    const { data:userSession, status } = useSession()

    const [coverImage, setCoverImage] = useState(null);
    const [backgrundImage, setBackgroundImage] = useState(null)

    const coverImageRef = useRef();
    const backgroundImageRef = useRef();


    const [loading, setLoading] = useState(false);
    const [nameChecking,setNamChecking]=useState(false)


    const { register, handleSubmit, watch, formState: { errors, isSubmitted } } = useForm()

    const nameValue = watch("name");
    const [available, setAvailable] = useState(null);
    const [typingTimeOut, setTypingTimeOut] = useState(null)
    const [privacy, setPrivacy] = useState('')

    const imagesMap = useRef(new Map())   



    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    }


    const value = [
        {
            name: "name",
            options: {
                maxLength: { value: 10, message: "Maximum 10 characters allowed" },
                minLength: {
                    value: 3,
                    message: "Minimum 3 character "
                }

            }
        }, {
            name: "category"
        }, {
            name: "bio"
        },
        {
            name: "rules"
        },
        {
            name: "privacy"
        }
    ]


    // I have to compress the image 


    async function handleChangeCover(e) {
        // console.log(e.target.files[0])
        const file = e.target.files[0];

        if (!file) {
            alert("please choose file ")
            return
        }
        // console.log(file.size)

        const compressedFile = await imageCompression(file, options);

        // console.log(compressedFile.size)



        const reader = new FileReader()
        reader.onload = () => {

            setBackgroundImage(reader.result)

        }
        reader.readAsDataURL(compressedFile)


        const formData = new FormData();
        formData.append('file', compressedFile);

        // setLoading(true)

        const res = await axios.post('/api/uploadImage', formData, {
            headers: {
                "Content-Type": 'multipart/formData'
            }
        })

        // console.log(res)
        // setImages(prev => [...prev, { coverPhoto: res.data.result.secure_url }])
        imagesMap.current.set("coverPhoto", res.data.result.secure_url)








    }
    async function handleChangeBackground(e) {
        console.log(e.target.files[0])

        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image")) {
            alert("please choose image file ")
            return
        }
        // console.log(file.size % 1024)



        const compressedFile = await imageCompression(file, options);

        // console.log(compressedFile.size % 1024)


        const reader = new FileReader();
        reader.onload = () => {
            setCoverImage(reader.result);
        }
        reader.readAsDataURL(compressedFile)

        const formData = new FormData();
        formData.append('file', compressedFile);
        setLoading(true)


        try {


            const res = await axios.post('/api/uploadImage', formData, {
                headers: {
                    "Content-Type": "multipart/formData"
                }
            })
            setLoading(false)


            // console.log(res)

            // setImages(prev => [...prev, { backgroundPhoto: res.data.result.secure_url }])
            imagesMap.current.set("backgroundPhoto", res.data.result.secure_url)

        } catch (err) {
            toast("error while uploading your image")

            setLoading(false)
        }



    }



    useEffect(() => {
        // console.log(data && data)
    }, [status])



    useEffect(() => {

        if (!nameValue || nameValue.length < 3 || nameValue.length > 30) {

            setAvailable(null)
            return
        }
        // debounce api call 
        if (typingTimeOut) clearTimeout(typingTimeOut);

        setNamChecking(true)
        const timeOut = setTimeout(async () => {
            setNamChecking(true)
            try {
                const res = await axios.post('/api/checkAvailableNamePage', {
                    name: nameValue
                })
                // console.log(res)

                setAvailable(res.data.available)
                // setLoading(false)
                setNamChecking(false)

            } catch (err) {
                console.error("check failed")
                setAvailable(null)
                // setLoading(false)
                setNamChecking(false)
            }
        }, 1000)

        setTypingTimeOut(timeOut)
        // setLoading(false)
        setNamChecking(false)




    }, [nameValue])




    async function onSubmit(data) {

        if (!available || !privacy) {
            alert("please choose a diferent page name..")
            return;
        }

        if (status == "loading" || status == "unauthenticated") {
            alert(status)
            return
        }

        if (!imagesMap.current.get("coverPhoto") || !imagesMap.current.get("backgroundPhoto")) {
            console.log(imagesMap)
            alert("please choose an image");
            return;


        }
        if(!data){
            return ;
        }
        // console.log(data, privacy, imagesMap.current.get("coverPhoto"),imagesMap.current.get("backgroundPhoto"))

   

try{
        const res = await axios.post('/api/createCommunity', {
            ...data,
            backgroundPhoto: imagesMap.current.get("backgroundPhoto"),
            coverPhoto: imagesMap.current.get("coverPhoto"),
            privacy: privacy,
            userId:userSession.user.id


        })
    
    toast.success("Sucessfully created")
    router.push(`/Home/Communities/${res.data.community.name}`)
    
    console.log(res)
    
    }
        catch(err){
            toast.error("error occured while creating community")
        }










    }







    return (
        <div className='w-full max-w-[700px] '>

            <div className="md:hidden ">
                <SmallScreenTopNav />

            </div>

            <div className={`mt-4   rounded-md  h-[180px]   md:h-[300px] max-h-[400px] relative w-full max-w-full   ${backgrundImage ? "relative " : "bg-gray-700"} flex flex-col items-center justify-center relative overflow-y-hidden`}>



                {backgrundImage && <img src={backgrundImage} className='object-contain rounded-md max-w-full' />}

                {!backgrundImage && <p className='text-white text-center flex items-center justify-center gap-2 '>Upload your cover Image

                    <span onClick={() => coverImageRef.current.click()}><FaEdit style={backgrundImage && { position: "absolute", top: "0", right: "0" }} className={` ${backgrundImage ? "absolute top-0 right-1 z-10 bg-white" : ""}fill-blue-400 size-5 cursor-pointer `} /></span>
                </p>}

                <div className='absolute bottom-[1%]'>

                    <span onClick={() => backgroundImageRef.current.click()}>
                        {!coverImage && <AiFillPicture className='size-14 md:Size-20 ring-2 ring-blue-400 rounded-full p-2 cursor-pointer fill-blue-400' />}
                        {
                            coverImage && <div>
                                <img src={coverImage} className='h-[70px] object-center  md:h-[100px] w-[70px] md:w-[100px] rounded-full ring-2 ring-white p-.5 z-10' />
                            </div>
                        }

                    </span>
                </div>


            </div>

            <div className='text-white  flex items-center justify-center flex-col space-y-6 mt-8'>
                <input type="file" ref={coverImageRef} hidden accept='image/*' onChange={(e) => handleChangeCover(e)} />
                <input type="file" ref={backgroundImageRef} hidden accept='image/*' onChange={(e) => handleChangeBackground(e)} />


                <form onSubmit={handleSubmit(onSubmit)} className="flex space-y-4 flex-col max-w-full w-full items-center justify-center">

                    {
                        value.map((el, i) => <div key={i} className={`w-full relative max-w-full px-4 ${el.name == "privacy" ? "border-0" : "border-1"} flex  items-center justify-center`}>



                            {
                                el.name === "privacy" ? <div className="w-full max-w-full ">
                                    <p className="text-center text-sm  mb-4">Chose community type</p>
                                    <div className="flex items-center justify-center gap-6 w-full max-w-full">

                                        <button type="button" onClick={() => setPrivacy('private')} className="border-white text-center py-1 border-1  gap-1 px-6 flex items-center">

                                            {privacy === "private" && <BiSolidSelectMultiple className="fill-blue-400" />}
                                            Private

                                        </button>
                                        <button type="button" onClick={() => setPrivacy('public')} className="border-white text-white py-1 border-1  px-6 flex items-center gap-1">

                                            {privacy === "public" && <BiSolidSelectMultiple className="fill-blue-400" />}
                                            Public


                                        </button>
                                    </div>

                                </div> :
                                    <input placeholder={el.name}  {...register(el.name, { required: true, ...(el.options || {}) })} className='outline-none border-none px-2 py-2 border-1 border-gray-700 w-full max-w-full' />
                            }

                            {
                                el.name == "name" && available && <span><TiTick className=" size-5  text-green-400" /> </span>
                            }
                        
                            {
                                el.name == "name" && nameChecking && <span><TbLoader3 className=" size-5 animate-spin text-green-400" /> </span>
                            }
                            {
                                el.name == "name" && !nameChecking && !available && <span>< MdDoNotDisturb className=" size-5  text-red-500" /> </span>
                            }



                        </div>)
                    }
                    {
                        Object.keys(errors).length > 0 && isSubmitted && <div className="text-gray-300 flex gap-1 items-center  ">
                            <p>
                                <IoIosWarning className="fill-red-400" />
                            </p>
                            <p>
                                Please fill all the feilds correctly
                            </p>
                        </div>
                    }


                    <div className="gap-2 flex mt-3 mb-3">
                        <button className='text-center border-1 border-gray-700 px-6 py-1 rounded-full text-sm cursor-pointer disabled:bg-red-500' disabled={!available || nameChecking || loading } type="submit">create</button>
                        <button className='text-center border-1 border-gray-700 px-6 py-1 rounded-full text-sm cursor-pointer md:hidden' onClick={() => router.push('/Home')}>Back</button>
                    </div>
                </form>
            </div>

        </div >

    )
}

"use client"
import React, { useEffect, useRef, useState } from 'react'
import { MdImage } from "react-icons/md";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { FaBrain } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import ImojiPickerBackground from './ImojiPickerBackground';
import ImagePreview from './ImagePreview';
import Poll from './Poll';
import { useSession } from 'next-auth/react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ClipLoader, FadeLoader, ScaleLoader } from "react-spinners"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import dataURItoBlob from '../_features/dataURItoBlob';
import { useUser } from './Providers';


export default function PostComponent() {
  const [picker, setPicker] = useState(false);
  const textRef = useRef()

  const router = useRouter()

  const [text, setText] = useState('')
  const [mediasUploaded, setMediaUploaded] = useState([])
  const [cursorPosition, setCursorPositon] = useState('')
  const [images, setImages] = useState([])
  const imageInputRef = useRef()
  const [postType, setPostType] = useState('image');
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(1)
  const [hour, setHour] = useState(0)
  const [min, setMins] = useState(0)



  // for Poll 
  const [Question, setQuestion] = useState('');

  const [option, setOptions] = useState([
    '', ''

  ])

  const { data, status } = useSession();
  const { user, setUser } = useUser()


  useEffect(() => {
    if (status == 'unauthenticated') {
      router.push('/auth/signin')
    } if (status === "authenticated") {
      setUser(data)

    }

  }, [status])





  // if postType is poll submit the question and option 
  // it tweetType is media submit the text and the images



  async function submitPost() {
    setLoading(true)

    if (postType === 'poll') {

      if (!Question) {
        alert("No question please type question")
      }


      const opt = [];
      option.forEach((el, i) => {
        if (el.length > 0) {
          opt.push(el)
        }
      })
      console.log(opt)
      if (!(opt.length >= 2)) {
        alert(" please give us options");
        setLoading(false)
        return
      }

      const res = await axios.post('/api/post', {
        email: data?.user.email,
        question: Question,
        option: opt,
        type: "poll",
        expiresIn: {
          days,
          min,
          hour
        }


      })
      console.log(res)
      setLoading(false);





setOptions([
    '', ''

  ])
  setQuestion('')



    } else if (postType === 'image') {
      // take images link , text and 
      if (images.length > 0) {
        const postImages = images.map((img) => dataURItoBlob(img.src));

        const formData = new FormData();
        formData.append("path", "bittukumar12/posts");

        postImages.forEach((blob) => {
          formData.append("files", blob); // backend expects "files"
        });

        try {
          setLoading(true);

          const res = await axios.post("/api/uploadfile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            // onUploadProgress: (e) => {
            //   const percentCompleted = Math.round((e.loaded * 100) / e.total);
            //   setPercent(percentCompleted);
            // },
          });

          // Prepare media array for MongoDB
          const media = res.data.uploaded.map((img, i) => ({
            url: img.url,
            type: images[i]?.type || "image", // fallback to image
          }));

          console.log("Media array to send to backend:", media);
          const res2 = await axios.post('/api/post', {
            email: data?.user.email,
            text,
            media,
            type: 'CONTENT'

          })
          console.log(res2)

          // Now you can POST this media array with your tweet
          // await axios.post("/api/tweet", { content, media, ... });

          setLoading(false);



        } catch (err) {
          console.error("Upload failed:", err.message);
          setLoading(false);
        }
      
      } else {
        setLoading(true)
        const res2 = await axios.post('/api/post', {
          email: data?.user.email,
          text,

          type: 'CONTENT'

        })
        console.log(res2)
        setLoading(true)
      }


    }
   setImages([])
   setText('')
   setPostType('image')

    setLoading(false)
  }



  if (status == "loading") {
    return <div className='flex items-center justify-center h-10'>
      <AiOutlineLoading3Quarters className='animate-spin text-white font-bold size-5' />
    </div>

  }




  return (
    <div className='flex flex-col text-white mt-2'>
      <div className='flex gap-x-3'>

        <img src={` ${user?.user?.image || "/my.png"}`} className='h-10 w-10 rounded-full' />
        <div className='text-blue-500 flex-grow'>
          {postType == 'image' &&
            <>
              <textarea ref={textRef} type="text" value={text} onChange={(e) => { setText(e.target.value) }} placeholder={`What is happenning `} className='text-white resize-none w-full border-none outline-none py-2 text-xl flex-grow' />


              <ImagePreview imageInputRef={imageInputRef} images={images} setImages={setImages} />
            </>
          }

          {
            postType == 'poll' && <Poll setPostType={setPostType} Question={Question} setQuestion={setQuestion} option={option} setOptions={setOptions} min={min} setMins={setMins} hour={hour} setHour={setHour} days={days} setDays={setDays} />
          }


        </div>
      </div>
      <div className='flex justify-between border-t-1 border-b-1 border-gray-400'>



        <div className='flex items-center justify-center  gap-x-3 border-white mt-2 '>

          <button disabled={postType == 'poll'} className='' onClick={() => {
            setPostType('image')
            imageInputRef.current.click()
            return;

          }

          }><span><MdImage className={` cursor-pointer ${postType == 'poll' ? 'fill-blue-200 cursor-none' : "fill-blue-500"} `} /></span></button>


          <button><span><FaSquarePollHorizontal className='fill-blue-500 cursor-pointer' onClick={() => {
            setPostType('poll')
          }} /></span></button>


          <button><span><FaBrain className='fill-blue-500 cursor-pointer' /></span></button>


          <div className='relative hidden md:block'>

            <button onClick={() => setPicker(picker => !picker)}><span><MdEmojiEmotions className='fill-blue-500 cursor-pointer' /></span></button>


            {picker && <div className='absolute top-10 left-0 z-10 hidden md:block' onMouseLeave={() => { setPicker(false) }}>


              <ImojiPickerBackground textRef={textRef} text={text} setCursorPositon={setCursorPositon} setText={setText} cursorPosition={cursorPosition} />
            </div>

            }
          </div>
          {/* <button>
            <img src={'/icons/colorful.png'} className='h-12 w-12 object-cover' />
          </button> */}

        </div>

        <div>

          <button className='px-4 py-1 m-1 bg-white text-black rounded-full' onClick={submitPost} disabled={loading}>{loading ? <AiOutlineLoading3Quarters className='size-5 text-black animate-spin ' /> : "Post"}</button>


        </div>
      </div>


    </div>
  )
}

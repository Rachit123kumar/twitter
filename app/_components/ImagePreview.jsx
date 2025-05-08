"use client"
import React, { useEffect, useState } from 'react';
import dataURItoBlob from '../_features/dataURItoBlob';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function ImagePreview({ images, setImages, text,imageInputRef }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uploading,setUploading]=useState(false);
  const [percent,setPercent]=useState(0);
  const [background,setBackground]=useState(false);
  const [user,setUser]=useState([])
  const [poll,setPoll]=useState({})



  const {data,status}=useSession()


  useEffect(()=>{
    
  
    

  },[status])








  function handleChange(e) {
    const files = Array.from(e.target.files);

    files.forEach((img) => {

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        const fileType=img.type.startsWith("video")?"video":"image"
        setImages((prev) => [...prev, {type:fileType,src:readerEvent.target.result}]);
      };
    });
  }

 async function handleUpload(){
    console.log(images)

    if(images.length>0){
      const postImages= images.map((img)=>{
        return dataURItoBlob(img.src)
      })
      console.log(postImages)

      let formData=new FormData();
      formData.append("path","bittukumar12/posts")
      postImages.forEach((img)=>{

        formData.append("files",img)
      })
  

        const res = await axios.post("/api/uploadfile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
         
        });
      console.log(res)

    const media=res.data.uploaded.map((img,i)=>{
      return {
        url:img.url,
        type:"image"
      }
    })


      const res2=await axios.post('/api/post',{
        kind:'CONTENT',
        media,
        text,


        email:data?.user.email,



      })
      console.log(res)
   
  
    



    }
  

  }
  function nextSlide() {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function previousSlide() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <div className="px-3 rounded-md mb-3 py-2 max-w-[600px] w-full">
      <input type="file" multiple hidden ref={imageInputRef} onChange={handleChange} accept='image/*,video/*' />

      {images && images.length > 0 && (
        <div className="relative overflow-hidden w-full bg-white">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${images.length * 100}%`
            }}
          >
            {images.map((imag, i) => (
              <div
                key={i}
                className="h-[300px] w-full   flex-shrink-0 bg-cover overflow-hidden   bg-center bg-gray-300">
                {  imag.type=="image"? <img src={imag.src} className='h-full w-auto    rounded-md'/>
                :
                <video
                src={imag.src}
                controls
                className="h-full w-auto rounded-md"
              />
                }

                    </div>


              
            ))}

            
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-2">
            <button onClick={previousSlide} className="bg-gray-300 px-3 py-1 rounded">Previous</button>
            <button onClick={nextSlide} className="bg-gray-300 px-3 py-1 rounded">Next</button>
          </div>
        </div>
      )}



{
  uploading && <div>

  
  </div>
}
      <div >
        {/* <button className='px-5 py-1 bg-white text-black mt-2 rounded-md ' onClick={handleUpload}>

        Post

        </button> */}
        {/* <span className='text-white'>{percent}</span>  */}
      </div>
    </div>
  );
}

import React, { useState } from 'react'

export default function ImageSlider({images}) {
    const [currentIndex,setCurrentIndex]=useState(0);
    const [touchStartX,setTouchStartX]=useState(null)
    const [touchEndX,setTouchEndX]=useState(null)


    function nextImage(){
        if(currentIndex<images.length-1){
            setCurrentIndex(cur=>cur+1)
            return

        }else{
            return
        }

    }
    function previousImage(){
        if(currentIndex==0){
            return
        }else{
            setCurrentIndex(cur=>cur-1)
        }

    }

    function handleTouchStartX(){
        

    }
    function handleTouchMove(){

    }

    function handleTouchEnd(){

    }

  return (
    <div className='relative max-w-[700px]  mt-0'>

    <div className=' overflow-hidden flex w-full  relative'>
        {
            images.map((el,i)=>{
                return <div key={i}  className='flex justify-center rounded-sm   transition-transform duration-500 w-full h-auto flex-shrink-0 bg-cover overflow-hidden bg-center items-center' style={{transform:`translateX(-${currentIndex*100}%)`, aspectRatio:'4/3'}}> 


   
    <img src={el.url || el.src} alt='tweet image ' className=' items-center h-auto  w-auto rounded-sm '/>


                </div>
            })
        }
        <button onClick={()=>nextImage()} style={{}} className={`${images.length==1 ?"hidden":""} absolute top-[50%] bg-black text-white px-2 py-1 rounded-sm z-10 opacity-80 `}> &rarr;</button>



        <button onClick={()=>previousImage()} className={` ${images.length==1 ?"hidden":""}absolute top-[50%] right-0 bg-black text-white py-2 px-1 opacity-80 `}>&larr;</button>
        </div>

    </div>
  )
}

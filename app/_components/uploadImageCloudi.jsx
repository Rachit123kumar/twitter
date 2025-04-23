"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { FaImage } from "react-icons/fa6";

export default function UploadImage({setImageUrl}) {

const [resource,setResource]=useState("")
  return (
    <div>
 
  
 <CldUploadWidget
   uploadPreset="js_imagnify"
   onSuccess={(result, { widget }) => {
    console.log(result,"result")
     setResource(result?.info.secure_url); 
     setImageUrl(result?.info.secure_url) // { public_id, secure_url, etc }
   }}
   onQueuesEnd={(result, { widget }) => {
     widget.close();
   }}
 >
   {({ open }) => {
     function handleOnClick() {
       setResource(undefined);
       open();
     }
     return (
       <button onClick={handleOnClick}>
       <FaImage className="size-6 mr-4"/>
       </button>
     );
   }}
 </CldUploadWidget>
{/* 
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded" className="w-60 h-auto" />
        </div>
      )} */}
    </div>
  );
}

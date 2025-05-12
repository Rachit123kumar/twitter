"use client";
import { useEffect, useState } from "react";
import ImageSlider from "../../_components/ImageSlider";

import { useParams } from "next/navigation";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import ReplyComponent from "../../_components/ReplyComponent";


export default  function PostID() {


    const [post,setPost]=useState(null)
    const [loading,setLoading]=useState(false)



    const params=useParams()
    const {postId}=params
    console.log(postId)




async function getData(){
    try{setLoading(true)
    const res=await axios.post('/api/onedetailpost',{
        postId
    })
    setPost(res.data)
    console.log(res.data)
    setLoading(false)}
    catch(err){
      setLoading(false);
      console.log(err)
    }

}


    useEffect(()=>{
        getData()

    },[])
  

  if (!post && !loading) {
    return <div className="text-white">Post not found</div>;
  }

  return (
    <div className="text-white max-w-[1200px] mx-auto px-4 mt-3">
      
     {post && 
         <div className="flex items-center  gap-2">
            <img src={post?.author?.image} alt={"profile image "} height={20} width={20} className="rounded-full"/> 
            <p className="text-blue-400 ">{post.author.name }</p>
        

      </div>
    }

      { post && post.kind === "CONTENT" && (
        <div>
          <p className="text-blue-400">{post.content || "No content available"}</p>

          { post && post?.media?.length > 0 && (
            <div className="">
         
              <ImageSlider images={post.media} />
            </div>
          )}
        </div>
      )}


      { loading && <div className="flex items-center justify-center h-[100vh] w-full animate-spin">
<AiOutlineLoading3Quarters className="size-10 text-white "/>




      </div>}

    <ReplyComponent/>

      <div className="mb-2">
        
      </div>
    </div>
  );
}

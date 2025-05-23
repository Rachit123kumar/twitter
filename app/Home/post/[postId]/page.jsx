"use client";
import { useEffect, useState } from "react";
import ImageSlider from "../../../_components/ImageSlider";
import TweetPoll  from "../../../_components/TweetPoll"
import { useRouter } from 'next/navigation'
import { useParams } from "next/navigation";
import axios from "axios";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import ReplyComponent from "../../../_components/ReplyComponent";
import { useSession } from "next-auth/react";
import LikeCompo from "../../../_components/LikeCompo";
import ShowAllcomments from "../../../_components/ShowAllcomments"



export default function PostID() {


  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const { status, data } = useSession()



  const params = useParams()
  const { postId } = params
  console.log(postId)

    const router=useRouter()


  async function getData() {
    try {



      setLoading(true)
      const res = await axios.post('/api/onedetailpost', {
        postId,
        email: data.user.email
      })
      setPost(res.data)
      console.log(res.data)
      setLoading(false)
    }
    catch (err) {
      setLoading(false);
      console.log(err)
    }

  }


  useEffect(() => {
    if (status == "unauthenticated" || status == "loading") {
      return
    }
    getData()

  }, [data, status])


  if (!post && !loading) {
    return <div className="text-white">Post not found</div>;
  }



  if (loading) {
    return <div className="h-[300px] w-full">
      <span><AiOutlineLoading3Quarters className="size-5 animate-spin " /></span>
    </div>
  }

  return (
    <div className="text-white max-w-[1200px] mx-auto px-4 mt-3">
   <button className='text-white  mb-2 cursor-pointer' onClick={()=>router.push("/Home")}>&larr; Home </button>
      {/* {post && 
         <div className="flex items-center  gap-2">
            <img src={post?.author?.image} alt={"profile image "} height={20} width={20} className="rounded-full"/> 
            <p className="text-blue-400 ">{post.author.name } </p>
        

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

      {
        post.kind=='POLL' && <div>
<p className="text-sm  pl-3">{post.poll.Question}</p>
<div>

{
  post.poll.options.map((post,i)=>{
    return <p  className="text-sm text-blue-800 cursor-pointer  bg-gray-300 mb-3 rounded-full px-3" key={i}>{post}</p>
  })
}

  </div>



        </div>
      } */}
      {post && <div className='border-b-2 border-gray-300 mt-2 mb-2 text-white'>
        {
          post.kind == 'CONTENT' && <div>
            <div>
              <div className='flex items-center gap-2 '>
                <div className='h-8 w-8 rounded-full bg-white overflow-hidden'>
                  <img src={post.author.profilePic} alt='profile image' className='object-contain' />
                </div>
                <div className='flex gap-1 items-center'>

                  <span className='text-xs font-sans text-gray-400'>@{post.author.userName}</span>
                  <p className=' font-sans text-sm text-blue-400 hover:underline cursor-pointer '>{post.author?.displayName}
                  </p>
                </div>


              </div>
              <p className='text-white pl-2 text-sm font-sans'>{post.content}</p>
            </div>
            {
              post?.media && post?.media?.length > 0 && <ImageSlider images={post.media} />

            }


          </div>
        }
        {
          post.kind == 'POLL' && <TweetPoll poll={post.poll} author={post.author} tweetId={post._id} hasVoted={post.hasVoted} pollResult={post.pollResults} />
        }


        <LikeCompo tweetId={post._id} likeCount={post.likeCount} commentCount={post.commentCount} isLikedByMe={post.isLikedByMe} user={data.user} />



      </div>
      }


      {loading && <div className="flex items-center justify-center h-[100vh] w-full animate-spin">
        {/* <AiOutlineLoading3QuartersclassName="size-10 text-white "/> */}




      </div>


      }
   

      <ReplyComponent author={post.author} tweetId={post?._id} />

      <ShowAllcomments comments={post.comments} />

      <div className="mb-2">

      </div>
    </div>
  );
}

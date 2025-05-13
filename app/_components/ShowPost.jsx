import React, { useEffect, useState } from 'react'
import ImageSlider from "../_components/ImageSlider"
import TweetPoll from "./TweetPoll"
import LikeCompo from "./LikeCompo"

import { useSession } from 'next-auth/react';

import { AiOutlineLoading } from 'react-icons/ai';

export default function ShowPost() {
  const [tweets, setAllTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")


  const { status, data } = useSession()
  console.log(data)

  useEffect(() => {

    async function iam() {

      try {

        if (status === "loading" || status === "unauthenticated") {
          return
        }
        console.log(data)
        const res = await fetch(`/api/getPost?email=${data?.user?.email}`)
        const ans = await res.json()

        console.log(ans)
        setAllTweets(ans)
        setLoading(false)
      } catch (err) {
        setError(err.message);
        setLoading(false);
        iam()

      }

    }

    iam()
  }, [status, data])




  if(status==="loading" || loading)return <div className='h-[300px] w-full flex items-center justify-center '>
    <AiOutlineLoading  className='size-5 text-white h-10 w-full animate-spin' />
  </div>



  return (
    <div className='text-white '>



      <div>


        {
          tweets.length > 0 && tweets.map((el, i) => {
            return <div key={i} className='border-b-2 border-gray-300 mt-2 mb-2'>
              {
                el.kind == 'CONTENT' && <div>
                  <div>
                    <div className='flex items-center gap-2 '>
                      <div className='h-8 w-8 rounded-full bg-white overflow-hidden'>
                        <img src={el.author.image} alt='profile image' className='object-contain' />
                      </div>
                      <p className='text-white font-sans text-sm'>{el.author.name}</p>

                    </div>
                    <p className='text-white pl-2 text-sm font-sans'>{el.content}</p>
                  </div>
                  {
                    el?.media && el?.media?.length > 0 && <ImageSlider images={el.media} />

                  }


                </div>
              }
              {
                el.kind == 'POLL' && <TweetPoll poll={el.poll} author={el.author} tweetId={el._id} hasVoted={el.hasVoted} pollResult={el.pollResults} />
              }


              <LikeCompo tweetId={el._id} likeCount={el.likeCount} commentCount={el.commentCount} isLikedByMe={el.isLikedByMe} />



            </div>
          })
        }

      </div>


    </div>
  )
}

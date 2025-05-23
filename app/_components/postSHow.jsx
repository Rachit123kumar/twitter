import React from 'react'
import ImageSlider from "../_components/ImageSlider"
import TweetPoll from "./TweetPoll"
import LikeCompo from "./LikeCompo"
import { useRouter } from 'next/navigation'
export default function PostSHow({tweets,data=null}) {

  const router=useRouter()


  return (<div>
{    tweets.map((el, i) => {
            return <div key={i} className='border-b-2 border-gray-300 mt-2 mb-2'>
              {
                el.kind == 'CONTENT' && <div>
                  <div>
                    <div className='flex items-center gap-2 '>
                      <div className='h-8 w-8 rounded-full bg-white overflow-hidden'>
                        <img src={ el.author.profilePic} alt='profile image' className='object-contain' />
                      </div>
                      <div className='flex gap-1 items-center'>

                            <span className='text-xs font-sans text-gray-400'>@{el.author.userName}</span>
                      <p className=' font-sans text-sm text-blue-400 hover:underline cursor-pointer '>{el.author?.displayName}
                      </p>
                      </div>
                  

                    </div>
                    <p className='text-white pl-2 text-sm font-sans cursor-pointer mt-2' onClick={()=>router.push(`/Home/post/${el._id}`)}>{el.content}</p>
                  </div>
                  {
                    el?.media && el?.media?.length > 0 && <ImageSlider images={el.media} />

                  }


                </div>
              }
              {
                el.kind == 'POLL' && <TweetPoll poll={el.poll} author={el.author} tweetId={el._id} hasVoted={el.hasVoted} pollResult={el.pollResults} />
              }


              <LikeCompo tweetId={el._id} likeCount={el.likeCount} commentCount={el.commentCount} isLikedByMe={el.isLikedByMe} user={data.user} />



            </div>
          })}
          </div>
  )
}

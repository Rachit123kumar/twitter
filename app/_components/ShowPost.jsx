import React, { useEffect, useState } from 'react'
import ImageSlider from "../_components/ImageSlider"
import TweetPoll from "./TweetPoll"
import LikeCompo from "./LikeCompo"
export default function ShowPost() {
    const [tweets,setAllTweets]=useState([]);

    useEffect(()=>{

        async function iam(){

            const res=await fetch('/api/getPost')
            const ans=await res.json()

            console.log(ans)
            setAllTweets(ans)
        
        }

        iam()
    },[])




  return (
    <div className='text-white '>
        
      

        <div>
            

            {
              tweets.length  &&  tweets.map((el,i)=>{
                    return <div key={i} className='border-b-2 border-gray-300 mt-2 mb-2'>
                      {
                        el.kind=='CONTENT' && <div>
                          <div>
                            <div className='flex items-center gap-2 '>
                             <div className='h-8 w-8 rounded-full bg-white overflow-hidden'>
                                <img  src={el.author.image} alt='profile image' className='object-contain'/>
                             </div>
                                <p className='text-white font-sans text-sm'>{el.author.name}</p>
                           
                            </div>
                            <p className='text-white pl-2 text-sm font-sans'>{el.content}</p>
                            </div>
                            {
                              el?.media && el?.media?.length>0 && <ImageSlider images={el.media}/>
                          
              }


                            </div>
                      }
                      {
                        el.kind=='POLL' && <TweetPoll poll={el.poll} author={el.author}/>
                      }

                     
<LikeCompo  tweetId={el._id} liked={false}/>



                        </div>
                })
            }
            
        </div>
        
        
        </div>
  )
}

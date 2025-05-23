import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'


export default function TweetPoll({ poll, author, tweetId, hasVoted, pollResult }) {
    const [alreadyVoted,setAlreadyVoted]=useState(hasVoted)
    const [result, setPollResult] = useState(pollResult)
    const [nowVoted,setNowVoted]=useState(false)
   const [loading,setLoading]=useState(false)
    const { data, status } = useSession()
    const router=useRouter()


    async function vote(num) {
        // take tweet Id , user email 
        // check if he is already voted not allow to vote only show the chart 


        if (status == "loading" || status == "unauthenticated") {
            return
        }


        if (hasVoted) {
            return
            // show the charts only
        } else {

            //  after voting on this tweet I have to increase the number of votes and then re calculate the percentaget 




setLoading(true)

            const res = await axios.post('/api/giveVote', {
                email: data.user.email

                , tweetId: tweetId,


                optionIndex: num
            })


            setPollResult(res.data.updatedResult)
            setNowVoted(true)
            setAlreadyVoted(true)
            setLoading(false)
            

        }
    }

function valeu(i) {
  if (loading || !nowVoted) return;
  const option = result.find((el) => el.optionIndex === i);
  return option ? option.percentage : 0;
}






    return (
        <div>
            <div>
             
            </div>



            <div className='flex gap-2 items-center'>
                <div className='h-8 w-8 overflow-hidden rounded-full'>

                    <img src={author.profilePic} alt="profile image" className='object-cover' />
                </div>
                <p>{author.displayName}
                    <span className='text-gray-600 text-sm ml-2'>{author.userName}</span>
                </p>

            </div>
            <div className='pl-4'>

                <p className='cursor-pointer' >{poll.Question}</p>
                <div className='flex flex-col gap-y-2 mb-3 mt-2'>


                    { !loading && !alreadyVoted &&
                        poll.options.map((el, i) => {
                            return <p key={i} onClick={() => vote(i)} className='border-1 cursor-pointer border-blue-300 rounded-md px-3 py-1 text-blue-400 text-center font-sans '>
                                {el}

                            </p>
                        })
                    }

                    {
                      !loading && !nowVoted && alreadyVoted &&
                        poll.options.map((el, i) => {
                            return (
                                <div
                                    key={i}
                                    className="relative bg-gray-800 rounded h-[24px] w-full max-w-[90%] my-2 overflow-hidden"
                                >
                                    {/* Percentage background bar */}
                                    <div
                                        style={{ width: `${result[i]?.percentage}%` }}
                                        className="absolute h-full bg-blue-600"
                                    ></div>

                                    {/* Text overlay */}
                                    <div className="relative z-10 flex justify-between items-center px-2 text-sm text-white h-full">
                                        <span>{el}</span>
                                        <span>{result[i]?.percentage || "0"}%</span>
                                    </div>
                                </div>
                            );
                        })
}
                    {
                   !loading && alreadyVoted&&  nowVoted &&
                        poll.options.map((el, i) => {
                            return (
                                <div
                                    key={i}
                                    className="relative bg-gray-800 rounded h-[24px] w-full max-w-[90%] my-2 overflow-hidden"
                                >
                                    {/* Percentage background bar */}
                                    <div
                                        style={{ width: `${valeu(i) }%` }}
                                        className="absolute h-full bg-blue-600"
                                    ></div>

                                    {/* Text overlay */}
                                    <div className="relative z-10 flex justify-between items-center px-2 text-sm text-white h-full">
                                        <span>{el}</span>
                                        {/* <span>{result[i]?.percentage || "0"}%</span> */}
                                        <span>{valeu(i) || "0"}%</span>
                                    </div>
                                </div>
                            );
                        })
}

{
    loading && <div className='h-20 w-full max-w-ful flex items-center justify-center'>
        <AiOutlineLoading className='h-10 animate-spin '/>

    </div>
}



                </div>

            </div>


        </div>
    )
}

import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

export default function TweetPoll({ poll, author, tweetId, hasVoted, pollResult }) {
    const [result, setPollResult] = useState(pollResult)

    const { data, status } = useSession()

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






            const res = await axios.post('/api/giveVote', {
                email: data.user.email

                , tweetId: tweetId,


                optionIndex: num
            })


            setPollResult(res.data.updatedResult)

        }
    }








    return (
        <div>



            <div className='flex gap-2 items-center'>
                <div className='h-8 w-8 overflow-hidden rounded-full'>

                    <img src={author.profilePic} alt="profile image" className='object-cover' />
                </div>
                <p>{author.displayName}</p>

            </div>
            <div className='pl-4'>

                <p>{poll.Question}</p>
                <div className='flex flex-col gap-y-2 mb-3 mt-2'>


                    {!hasVoted &&
                        poll.options.map((el, i) => {
                            return <p key={i} onClick={() => vote(i)} className='border-1 cursor-pointer border-blue-300 rounded-md px-3 py-1 text-blue-400 text-center font-sans '>
                                {el}

                            </p>
                        })
                    }

                    {
                        hasVoted &&
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
                                        <span>{result[i]?.percentage}%</span>
                                    </div>
                                </div>
                            );
                        })
}



                </div>

            </div>


        </div>
    )
}

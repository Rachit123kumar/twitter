import React from 'react'

export default function TweetPoll({ poll, author, tweetId, voted}) {



    async function vote(){
        // take tweet Id , user email 
        // check if he is already voted not allow to vote only show the chart 

        if(voted){
            return 
            // show the charts only
        }else{
            
        }
    }








    return (
        <div>



            <div className='flex gap-2 items-center'>
                <div className='h-8 w-8 overflow-hidden rounded-full'>

                    <img src={author.image} alt="profile image" className='object-cover' />
                </div>
                <p>{author.name}</p>

            </div>
            <div className='pl-4'>

                <p>{poll.Question}</p>
                <div className='flex flex-col gap-y-2 mb-3 mt-2'>
                    

                {
                    poll.options.map((el, i) => {
                        return <p key={i} className='border-1 border-blue-300 rounded-md px-3 py-1 text-blue-400 text-center font-sans '>
                            {el}

                        </p>
                    })
                }
                </div>

            </div>


        </div>
    )
}

import React from 'react'

export default function ShowAllcomments({comments}) {

  return (
    <div>
        <p className='flex items-center text-blue-700 '>
            All comments 
            </p>

            {
                comments.length>0 && comments.map((el,i)=>{
                    return <div className="text-white text-sm mb-3" key={i}>
                        <div className='flex items-center gap-3'>
                          <img src={el?.author.image} height={20} width={20} className='rounded-full'/>
                          <p >{el.author.name} <span className="underline text-blue-400 text-xs cursor-pointer">@{el.author.email}</span></p>

                            </div>
                        <p  className='text-sm pl-3'>{el?.content}</p>



                    </div>
                })
            }




    </div>
  )
}

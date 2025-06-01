import React from 'react'

export default function UserName({author}) {
  return (
    <div className='flex flex-col md:flex-row gap-2 md:items-center '>
             <span className={`md:text-sm font-sans text-gray-400  text-xs`}>@{author.userName}</span>
                      <p className=' font-sans md:text-sm text-blue-400 hover:underline cursor-pointer text-xs '>{author?.displayName}
                      </p>
    </div>
  )
}

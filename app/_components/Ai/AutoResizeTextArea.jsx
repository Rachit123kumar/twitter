import { Textarea } from '../../../components/components/ui/textarea'
import React, { useState } from 'react'

export default function AutoResizeTextArea({question,setQuestion,id}) {

  return (
    <div className='w-full '>


<Textarea className='w-full font-sans ' value={question[id].question || ""} onChange={(e)=>setQuestion(prev=>prev.map((el,idx)=>idx==id ?{...el,question:e.target.value}:el))}>



</Textarea>

    </div>
  )
}

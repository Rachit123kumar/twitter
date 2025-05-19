import React, { useEffect } from 'react'
import Picker from "emoji-picker-react"
export default function ImojiPickerBackground({text,textRef,setCursorPositon,setText,cursorPosition}) {



    function handleEmojiClick(emojiData, event) {

        // start postiion 
        const ref = textRef.current
        ref.focus()
       console.log(text)
        const start = text.substring(0, ref.selectionStart)
        const end = text.substring(ref.selectionStart)
        const { emoji } = emojiData
        const newText = start + emoji + end
    
        setText(newText)
        setCursorPositon(start.length+emoji.length)
    
    
      }


      useEffect(() => {
        textRef.current.selectionEnd =cursorPosition
      }, [cursorPosition])
    
    



  return (
    <div>   
        
        
        <Picker onEmojiClick={handleEmojiClick} /></div>
  )
}

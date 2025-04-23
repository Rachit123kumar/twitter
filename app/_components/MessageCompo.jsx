import Image from "next/image";

import backGroundImage from "../../public/background1.jpg"
import axios from "axios";
import { URL } from "./SelectedChat";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import UploadImage from "./uploadImageCloudi";
import { CldUploadWidget } from "next-cloudinary";
import UploadImageCloudi from "./uploadImageCloudi";
import { MdModeEditOutline } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useMessages } from "../_features/utils/helper";
import { use } from "react";
import TypingAnimation from "./TypingAnimation";
import { PORT } from "./FriendList";
// {
//   "_id": "67f8b9c89d31db863d585dcd",
//   "senderId": "67f8b807ab607e8dfc0c77ff",
//   "receiverId": "67f8b63f309f8605c7ffd431",
//   "image": "",
//   "text": "i am okay and how ae re you ji",
//   "__v": 0
// }
const ChatComponent = ({ user, selectedUser,socket }) => {



  const { data:messages, isLoading, error } = useMessages(user.id, selectedUser?._id)
  const[localMessage,setLocalMessage]=useState([])

  const [text, setText] = useState("")
  const [imageUrl,setImageUrl]=useState("")
  const inputFile=useRef(null);
  const [isOtherTyping,setIsOtherTyping]=useState(false);
  const typingTimeOutRef=useRef(null);
  const typingDebounceRef=useRef(null)
  const isTypingRef = useRef(false);

  useEffect(()=>{
    if(isLoading)return 
setLocalMessage(messages.data)
  },[messages])



useEffect(()=>{
// console.log(" I am from friendList")
  if(!socket){
    return
  }

//   {
//     "type": "private",
//     "text": "mai hoon ",
//     "senderId": "67f8b63f309f8605c7ffd431",
//     "receiverId": "67f92788f484d62221b57ec4",
//     "image": ""
// }

  const handleSocketMessage=(event)=>{
    console.log(event.data)
    const data=JSON.parse(event.data)
    // toast.error("i got message")

    if(data.type=="private"){
      console.log(data)
      // toast.error("i got private  message")
      if(data.receiverId===user.id){
        setLocalMessage((prev)=>[...prev,{text:data.text,senderId:data.senderId,receiverId:selectedUser._id,image:data.image}])

      }
      // console.log(data.user);
      // setUserOnline(data.user)
    }
    if(data.type=="typing"){
      if (data.receiverId==user.id && data.senderId===selectedUser._id){
        // if(data.isTyping){
          setIsOtherTyping(data.isTyping)
        // }
        // senderId:user.id,
        // receiverId:selectedUser._id,
        // isTyping:true

      }
    }


  }
  socket.addEventListener('message', handleSocketMessage);
  return () => {
    socket.removeEventListener('message', handleSocketMessage);
  };

},[socket,selectedUser,user])




  
  // console.log(messages, "messages from chatCompo")





  async function sendMessage() {

    if(!socket){
      toast.error("there is no socket")
      return
    }
    
    if (!text && !imageUrl) {
      toast.error("please type a message or send Image ")
      return
    }



    socket.send(JSON.stringify({
      type:"private",
      senderId: user.id,
      receiverId: selectedUser._id,
      text: text,
      image:imageUrl
      
    }))
    const res = await axios.post(`${PORT}/message/send`, {
      senderId: user.id,
      receiverId: selectedUser._id,
      text: text,
      image:imageUrl
      
      
      
    })

    setLocalMessage([...localMessage,{text:text,senderId:user.id,receiverId:selectedUser._id,image:imageUrl}])
    // messages.push({
    //   text,
    //   senderId:user.id,receiverId:selectedUser._id,image:imageUrl
    // })
    setText("")
    setImageUrl("")
    
  }
  
  
   
  
  // console.log(imageUrl,"imageUrl")


  return (
 
    <div className="flex flex-col w-full h-[calc(100vh-64px)]"> {/* 64px AppBar height */}

    {/* Messages Area */}
    <div className="flex-1 overflow-y-auto px-3 py-2 bg-cover bg-center friend-scroll" style={{ maxHeight: 'calc(100vh - 64px - 60px)' }}>
      <div className="flex flex-col gap-y-3">
        { localMessage && localMessage.map((el, i) => (
          <div
            key={i}
            className={`max-w-fit px-2 py-1 text-white rounded-lg ${
              el.senderId === user.id ? "self-end bg-green-700" : "self-start bg-gray-700"
            }`}
          >
            <p className="relative">
              {el.image && <img src={el.image} className="h-20 w-20" />}
              {el?.text}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Optional preview image */}
    {imageUrl && (
      <div className="p-2 relative">
        <span className="absolute top-0 right-left-0 bg-dark ring-2 rounded-full text-black " onClick={()=>setImageUrl("")}>
  <ImCross />

        </span>
        <img src={imageUrl} alt="preview" className="h-30 w-30" />
      </div>
    )}
    {
      isOtherTyping && <div>
      <TypingAnimation/>
        </div>
    }

    {/* Input Box - Fixed at Bottom */}
    <div className="w-full bg-amber-800 py-2 px-4 flex items-center gap-2 h-[60px] mb-10">
      <UploadImageCloudi setImageUrl={setImageUrl} />
      <input
        type="text"
        placeholder="Enter your message"
        value={text}


        onChange={(e) => {
          setText(e.target.value)



// send typing true when user starts to type 
if(!isTypingRef.current){

  
  socket.send(JSON.stringify({
    type:"typing",
    senderId:user.id,
    receiverId:selectedUser._id,
    isTyping:true
  }))
}
// reset typing false time out 
if(typingDebounceRef.current){
  clearTimeout(typingDebounceRef.current)
}

typingDebounceRef.current=setTimeout(()=>{
  socket.send(
    JSON.stringify({
      type:"typing",
      senderId:user.id,
      receiverId:selectedUser._id,
      isTyping:false
    })
  )
  isTypingRef.current=false;

},2000)


    
        
        
        }
        }
        className="flex-1 rounded-md py-2 px-3 bg-gray-100 text-black outline-none "
      />
      <span onClick={sendMessage} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="size-6 text-green-500"
          viewBox="0 0 24 24"
        >
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </span>
    </div>
  </div>
);
    
    

  
};

export default ChatComponent;

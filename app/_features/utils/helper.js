// import { URL } from "@/app/_components/SelectedChat"
import { PORT } from "../../_components/FriendList"
// import { PORT } from "///../_components/FriendList"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export async function getUserMessage(senderId,receiverId){
   try{ const res=  await axios.get(`${PORT}/message/get`,{
        params:{
  
          
        //   senderId:user.id,receiverId:selectedUser._id
          senderId:senderId,receiverId:receiverId
        }
      
      })
      return res
    }catch(err){
        throw new Error("Error while fetching message")
    }
}


export function useMessages(senderId,receiverId){
    return useQuery({
        queryKey:["messages",senderId,receiverId],
        queryFn:()=>getUserMessage(senderId,receiverId),
        enabled:!!senderId && !!receiverId,
        staleTime:1000*10
    })
}
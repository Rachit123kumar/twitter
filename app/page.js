"use client"
import Image from "next/image";
import Login from "./_components/Login";
import AppBar from "./_components/AppBar";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import {useSelector,useDispatch} from "react-redux"
import { useEffect } from "react";
import { setUser } from "./_features/store/userSlice";

export default function Home() {

  const router = useRouter()
  const dispatch=useDispatch()

  const { status, data } = useSession();
  // console.log(data)

  

  useEffect(() => {


    // if(status=="unauthenticated"){
    //   router.push("/api/auth/signin")
    // }

    if (status == "authenticated") {
      dispatch(setUser(data.user))

    }
  }, [status])
  // console.log(user, "user from userStore")


  return (
    <div>
      {/* <Login/> */}
      <AppBar />
    </div>
  );
}

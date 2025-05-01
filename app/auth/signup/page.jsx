"use client"


import { Button, FormControl, Input, MenuItem, Select } from '@mui/joy';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    color:"black",
    p: 4,
  };
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "June", "july", "Aug", "Sept", "Otob", "Nov", "Dece"
]
const year = Array.from({ length: 50 }, (_, i) => i + 1)

const inputStyle = "px-3 py-2 outline-none border-none bg-gray-100 text-black"

const errorStyle = "text-white bg-red-500 text-sm px-3 py-1 mt-1 rounded-sm"

// export const URL="http://localhost:3001/";
export default function Signup() {

    const [gender, setGender] = useState("")
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [userEmail,setUserEmail]=useState("")
     

 const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [otp,setOtp]=useState("")

    // i have to get the email and password from the respone
    // 2 open the modal
    // 3 verify the otp
    // If did not verified show them a error 

// user sign-up
    async function userSignup(data) {
        try{ 
            setLoading(true)

            const res = await axios.post("http://localhost:3001/user-signup", {
                data
            })
            console.log(res.data.userEmail,"no response")
            setUserEmail(res.data.userEmail)
            

        //  console.log(res.response.data)
         if(res.status==203){
            toast("your account is already in use.")

         }

         if(res.status===201){
            toast("your account has been sucessfully created...");
            setOpen(true);
            setUserEmail(res.data.userEmail)


         }

   setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)

        }


    }



// function submit data
    function onSubmit(data) {
        console.log(data)
        userSignup(data)

        



    }

    // function verify-otp
   async function verifyOtp(){
    const res=await axios.post(`${URL}verify-otp`,{email:userEmail,otp});
    if(res.status===303){
        toast("Invalid otp |try again ");

    }
    if(res.status===200){
        toast("your account has been verified")
        // redirect him to login page ...
        router.push("/api/auth/signin")


    }


    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center  h-screen bg-gray-100'>
            <p className='text-center text-5xl font-bold mt-3 text-blue-600 mb-4'>
                ChatBook
            </p>
            <div className='bg-white  shadow-2xl rounded-md px-5 py-2'>

                <p className='text-black text-center text-2xl'>create a new Account </p>
                <p className='text-black text-center'>  quick and easy</p>
                <div className='h-1 border-2 bg-red-300 mt-3'></div>
                <div className='grid grid-cols-2 gap-x-3 mt-7 gap-y-5'>
                    <div>

                        <input placeholder='Name' required className={`${inputStyle}`}  {...register("firstName", { required: true })} />
                        {errors.firstName && <div className={`${errorStyle}`}>firstName is required</div>}

                    </div>
                    <div>

                        <input placeholder='Surname' className={`${inputStyle}`} {...register("surName", { required: true })} />
                        {
                            errors.surname && <div className={`${errorStyle}`}>surname is requrired</div>
                        }

                    </div>
                    <div className='col-span-2  '>
                        <p className='text-xs text-black mb-2 font-medium ml-1'>Date of birth ?</p>
                        <div className='flex gap-x-4 justify-between'>
                      

                            <input type="date" className='text-black ' {...register("dateOfBirth", { required: true })} />
                            {
                                errors.dateOfBirth && <div className={`${errorStyle}`}>Date of Birth is required</div>
                            }
                        </div>




                    </div>



                    <div className='col-span-2 '>
                        <p className='text-xs mb-2 ml-1 text-black'> Gender ?</p>
                        <div className='flex  justify-between pr-5 text-black items-center'>

                
                            <div className='flex justify-center gap-2 bg-gray-100 px-3 py-2'>

                                <input type="radio" name="gender" {...register("gender", { required: "please select a gender" })} value="male" id="male" />
                                <label htmlFor='male'>Male</label>
                            </div>
                            <div className='flex justify-center gap-2 bg-gray-100 px-3 py-2'>

                                <input type="radio" name="gender" {...register("gender",)} value="female" id='female' />
                                <label htmlFor='female'>Female</label>
                            </div>
                            <div className='flex justify-center gap-2 bg-gray-100 px-3 py-2'>

                                <input type="radio" name="gender" {...register("gender")} id='custom' value="custom" />
                                <label htmlFor='custom'>custom</label>
                            </div>






                        </div>
                        {
                            errors.gender && <div className={`${errorStyle}`}>
                                please select a gender
                            </div>
                        }
                    </div>
                    <div className='col-span-2'>
                        <input
                            type="email"

                            placeholder="Email"
                            {...register("email", {
                                required: { value: true, message: "Email is required" },
                                  pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|live\.com|msn\.com|icloud\.com)$/,
                                    message: "Invalid email format (Only Gmail, Outlook, Hotmail, Yahoo, Live, MSN, or iCloud allowed)"
                                  }
                            })}
                            className={`${inputStyle} w-full`}
                        />

                        {errors.email && <div className={`${errorStyle}`}>{errors.email.message}</div>}
                    </div>
                    <div className='col-span-2'>
                        <input
                            type="text"

                            placeholder="password"
                            {...register("password", {
                                required: { value: true, message: "password is required", },
                              
                            })}
                            className={`${inputStyle} w-full`}
                        />

                        {errors.email && <div className={`${errorStyle}`}>{errors.email.message}</div>}
                    </div>


                </div>

                <div className="flex justify-center mt-3">
                    <button color='success' type='submit' disabled={loading} className='bg-blue-400 text-white px-4 py-2 rounded-md'>{loading ? "Loading" :"signup"}</button>


                </div>
                <div>
                    <p className='text-blue-600 font-md font-normal text-center mb-4 mt-3 cursor-pointer' onClick={() => router.push("/")}>Already have an account ?</p>
                </div>
            </div>


            <main >

            </main>
    
      <Modal
        open={open}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className='text-green-400' id="modal-modal-title" variant="h6" component="h2">
            Verify your account
          </Typography>
          <Typography id="modal-modal-description" className='mb-3' sx={{ mt: 2,mb:2 }}>
           Enter your otp to verify your account
          </Typography>
          {/* <OTPInput setOtp={setOtp}/>
           */}
           <input type="text" placeholder='enter your otp' value={otp} onChange={(e)=>setOtp(e.target.value)} className='bg-gray-100 px-4 py-2 text-black border-none outline-none'/>

<div className='flex items-center justify-center mt-2  gap-4'>


          <button className='bg-green-500 text-white px-5 py-2 rounded-md ' onClick={verifyOtp} >verify</button>
          <button className='bg-red-500  text-white px-5 py-2 rounded-md ' onClick={ handleClose} >close</button>
</div>
        </Box>
      </Modal>
        </form >

    );
}

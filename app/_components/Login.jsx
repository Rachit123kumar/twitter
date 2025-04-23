"use client"
import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useRouter } from 'next/navigation';





export default function Login(props) {
   const router=useRouter()
    const [loading,setLoading]=React.useState(false)


  return (
    <div className='flex flex-col items-center justify-center  h-screen'>
        <p className='text-center text-5xl font-bold mt-3'>
            ChatBook
        </p>

    <main >
      <CssVarsProvider {...props}>
        {/* <ModeToggle /> */}
        <CssBaseline />
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <p className='text-center'>Welcome!</p>
            </Typography>
            <Typography level="body-sm" className="text-center">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
            />
          </FormControl>
          <FormControl>
           
            <FormLabel>Password
          
            </FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
            />
          </FormControl>
         {loading ? <Button onClick={()=>setLoading(!loading)} loading variant="solid">
  Loading
</Button>:
          <Button onClick={()=>setLoading(!loading)}  sx={{ mt: 1 /* margin top */ }} >Log in  </Button>
}
          <p className='text-sm text-center'>Don't have an account?
            <span className='text-blue-400 cursor-pointer' onClick={()=>router.push("/signup")}> signup</span>
          </p>
          
        </Sheet>
      </CssVarsProvider>
    </main>
    </div>

  );
}

"use client"
import React, { createContext, useContext, useState } from 'react'
import { SessionProvider } from "next-auth/react"
import {

  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
import { Provider } from 'react-redux'


import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()

import { ToastContainer } from 'react-toastify';
import { store } from '../_features/store/store'



const UserContext=createContext();




export default function Providers({ children }) {
  const [user,setUser]=useState(null);





  return (
    <div>

      <SessionProvider>
        <Provider store={store}>

        <QueryClientProvider client={queryClient}>
<UserContext.Provider  value={{user,setUser}}>
  
          {children}
</UserContext.Provider>
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
        </Provider>

        <ToastContainer />
      </SessionProvider>
    </div>
  )
}


export function useUser(){
  return useContext(UserContext)
}
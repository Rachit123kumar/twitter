"use client"
import React from 'react'
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
export default function Providers({ children }) {




  return (
    <div>

      <SessionProvider>
        <Provider store={store}>

        <QueryClientProvider client={queryClient}>

          {children}
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
        </Provider>

        <ToastContainer />
      </SessionProvider>
    </div>
  )
}
